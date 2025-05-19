import { useRef, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form } from "@remix-run/react";
import type { VideoItem } from "@/types";

interface VideoPlayerProps {
  videos: VideoItem[];
  sessionUserId: string | null;
  initialIndex?: number;
}

export function VideoPlayer({ 
  videos, 
  sessionUserId, 
  initialIndex = 0 
}: VideoPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userLiked, setUserLiked] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);
  const lastTapTime = useRef<number>(0);
  const isAnimating = useRef(false);
  const fetcher = useFetcher();

  // Get current video
  const currentVideo = videos[currentIndex];
  const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating.current) return;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    
    // Check for double tap
    const now = Date.now();
    const timeDiff = now - lastTapTime.current;
    if (timeDiff < 300) {
      handleDoubleTap();
    }
    lastTapTime.current = now;
  };

  // Handle double tap to like
  const handleDoubleTap = () => {
    if (!currentVideo || !sessionUserId) return;
    
    // If user hasn't liked this video yet
    if (!userLiked[currentVideo.id]) {
      // Like the video
      fetcher.submit(
        { 
          _t: "vote", 
          videoId: currentVideo.id.toString(), 
          dir: "up" 
        },
        { method: "post" }
      );
      
      // Show heart animation
      const heartElement = document.createElement('div');
      heartElement.className = 'heart-animation';
      heartElement.innerHTML = '❤️';
      containerRef.current?.appendChild(heartElement);
      
      // Remove after animation completes
      setTimeout(() => {
        containerRef.current?.contains(heartElement) && 
        containerRef.current?.removeChild(heartElement);
      }, 1000);
      
      // Mark as liked
      setUserLiked(prev => ({ ...prev, [currentVideo.id]: true }));
    }
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating.current || touchStartY.current === null) return;
    touchEndY.current = e.touches[0].clientY;
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (isAnimating.current || touchStartY.current === null || touchEndY.current === null) {
      touchStartY.current = null;
      touchEndY.current = null;
      touchStartTime.current = null;
      return;
    }

    const yDiff = touchStartY.current - touchEndY.current;
    
    // If the swipe is significant (more than 50px)
    if (Math.abs(yDiff) > 50) {
      if (yDiff > 0) {
        // Swipe up - next video
        handleVideoChange(nextIndex);
      } else {
        // Swipe down - previous video
        handleVideoChange(prevIndex);
      }
    }
    
    touchStartY.current = null;
    touchEndY.current = null;
    touchStartTime.current = null;
  };
  
  // Handle video change
  const handleVideoChange = (index: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    // Stop current video
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex]!.pause();
    }
    
    const containerElement = containerRef.current;
    if (containerElement) {
      // Apply sliding animation
      const direction = index > currentIndex ? 'up' : 'down';
      if ((currentIndex === videos.length - 1 && index === 0) || 
          (currentIndex === 0 && index === videos.length - 1)) {
        direction === 'up' ? 'down' : 'up'; // Reverse for looping from first to last
      }

      containerElement.classList.add(`slide-${direction}`);
      
      // After animation completes
      setTimeout(() => {
        setCurrentIndex(index);
        containerElement.classList.remove(`slide-up`, `slide-down`);
        isAnimating.current = false;
        
        // Play new video
        const newVideoElement = videoRefs.current[index];
        if (newVideoElement) {
          newVideoElement.play()
            .then(() => setIsPlaying(true))
            .catch(error => console.error("Autoplay prevented:", error));
        }
      }, 300);
    } else {
      // Fallback if no container reference
      setCurrentIndex(index);
      isAnimating.current = false;
    }
  };

  // Handle video play/pause toggle on click
  const togglePlayPause = () => {
    const videoElement = videoRefs.current[currentIndex];
    if (!videoElement) return;
    
    if (videoElement.paused) {
      videoElement.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  // Set up references and autoplay current video
  useEffect(() => {
    const videoElement = videoRefs.current[currentIndex];
    if (videoElement) {
      videoElement.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error("Autoplay prevented:", error));
    }
    
    // Add CSS for animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .video-container {
        position: relative;
        transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
      }
      .slide-up {
        transform: translateY(-100%);
      }
      .slide-down {
        transform: translateY(100%);
      }
      .video-element {
        transition: opacity 0.2s ease;
      }
      .heart-animation {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 100px;
        animation: heart-grow 1s forwards;
        pointer-events: none;
        z-index: 100;
      }
      @keyframes heart-grow {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, [currentIndex]);

  if (!currentVideo || videos.length === 0) 
    return <div className="flex items-center justify-center h-screen">No videos available</div>;

  return (
    <div 
      className="h-screen w-full relative bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        ref={containerRef}
        className="video-container h-full w-full"
      >
        {/* Video elements */}
        {videos.map((video, index) => (
          <div 
            key={video.id} 
            className={`absolute inset-0 h-full w-full ${
              index === currentIndex ? 'z-10' : 'z-0 opacity-0'
            }`}
          >
            <video
              ref={el => { videoRefs.current[index] = el }}
              src={video.url}
              className="h-full w-full object-contain video-element"
              loop
              playsInline
              preload={index === currentIndex || index === prevIndex || index === nextIndex ? "auto" : "none"}
              onClick={togglePlayPause}
            />
            
            {/* Video info overlay - only show for current video */}
            {index === currentIndex && (
              <div className="absolute bottom-20 left-4 right-16 z-20 text-white">
                <p className="font-bold text-lg">{video.title || `@${video.authorName || 'user'}`}</p>
                <p className="text-sm opacity-80">
                  {new Date(video.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Play/pause indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                ▶️
              </div>
            </div>
          </div>
        )}

        {/* Right side action buttons */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-20">
          <fetcher.Form method="post" className="flex flex-col gap-6">
            <input type="hidden" name="_t" value="vote" />
            <input type="hidden" name="videoId" value={currentVideo.id} />

            <Button
              size="icon"
              variant="ghost"
              name="dir"
              value="up"
              aria-label="thumb up"
              className={`text-white bg-transparent hover:bg-white/20 rounded-full w-12 h-12 flex flex-col items-center ${
                userLiked[currentVideo.id] ? 'text-red-500' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!userLiked[currentVideo.id]) {
                  setUserLiked(prev => ({ ...prev, [currentVideo.id]: true }));
                }
              }}
              disabled={userLiked[currentVideo.id]}
            >
              <ThumbsUp className="w-6 h-6" />
              <span className="text-xs mt-1">{
                userLiked[currentVideo.id] ? 
                  currentVideo.thumbsUp + 1 : 
                  currentVideo.thumbsUp
              }</span>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              name="dir"
              value="down"
              aria-label="thumb down"
              className="text-white bg-transparent hover:bg-white/20 rounded-full w-12 h-12 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ThumbsDown className="w-6 h-6" />
              <span className="text-xs mt-1">{currentVideo.thumbsDown}</span>
            </Button>

            {/* Comments button */}
            <Button 
              variant="ghost" 
              className="text-white bg-transparent hover:bg-white/20 rounded-full w-12 h-12 flex flex-col items-center"
              onClick={(e) => {
                e.stopPropagation();
                setIsDrawerOpen(true);
              }}
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs mt-1">{currentVideo.comments.length}</span>
            </Button>
          </fetcher.Form>
        </div>
      </div>

      {/* Comments drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Comments</DrawerTitle>
            <DrawerDescription>
              {currentVideo.comments.length === 0 ? 'No comments yet' : `${currentVideo.comments.length} comments`}
            </DrawerDescription>
          </DrawerHeader>
          
          {/* Comments list */}
          <div className="px-4 overflow-y-auto max-h-[50vh]">
            {currentVideo.comments.length === 0 ? (
              <p className="py-4 text-center text-gray-500">Be the first to comment</p>
            ) : (
              currentVideo.comments.map((comment) => (
                <div key={comment.id} className="border-b py-3">
                  <p className="font-semibold">{comment.authorName}</p>
                  <p>{comment.body}</p>
                </div>
              ))
            )}
          </div>
          
          {/* Add comment form */}
          {sessionUserId && (
            <DrawerFooter>
              <Form
                method="post"
                className="flex gap-2"
              >
                <input type="hidden" name="_t" value="comment" />
                <input type="hidden" name="videoId" value={currentVideo.id} />
                <input type="hidden" name="userId" value={sessionUserId} />
                
                <Input
                  name="body"
                  required
                  placeholder="Add a comment…"
                  className="flex-1"
                />
                <Button type="submit">Send</Button>
              </Form>
            </DrawerFooter>
          )}
          
          <DrawerClose />
        </DrawerContent>
      </Drawer>
    </div>
  );
}