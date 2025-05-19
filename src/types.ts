export interface CommentRow {
    id: number;
    videoId: number;
    body: string;
    authorName: string | null;
  }
  
  export interface VideoItem {
    id: number;
    url: string;
    title?: string | null;
    thumbsUp: number;
    thumbsDown: number;
    authorName: string | null;
    userId: string;
    createdAt: string;
    comments: CommentRow[];
  }
  
  export interface MessageItem {
    id: number;
    senderId: string;
    senderName: string | null;
    receiverId: string;
    receiverName: string | null;
    message: string;
    read: boolean;
    createdAt: string;
  }
  
  export interface ConversationPartner {
    id: string;
    name: string | null;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
  }
  
  export interface UserProfile {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    bio: string | null;
    location: string | null;
    username: string | null;
    createdAt: string;
    updatedAt: string;
  }