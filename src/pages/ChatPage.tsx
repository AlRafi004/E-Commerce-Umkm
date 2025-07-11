import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Alert,
} from "@mui/material";
import { Send, Store } from "@mui/icons-material";

interface Message {
  id: number;
  text: string;
  sender: "buyer" | "seller";
  timestamp: Date;
  senderName: string;
}

interface ChatRoom {
  id: string;
  storeName: string;
  storeAvatar: string;
  lastMessage: string;
}

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string>("store001");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Demo chat rooms
  const chatRooms: ChatRoom[] = [
    {
      id: "store001",
      storeName: "Kebun Durian Pak Hasan",
      storeAvatar: "🌾",
      lastMessage: "Durian masih tersedia, silakan order!",
    },
    {
      id: "store002",
      storeName: "Kopi Nusantara",
      storeAvatar: "☕",
      lastMessage: "Terima kasih sudah order kopi!",
    },
  ];

  // Demo messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Halo, saya tertarik dengan durian montong yang Anda jual. Apakah masih tersedia?",
      sender: "buyer",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      senderName: "Sari Dewi",
    },
    {
      id: 2,
      text: "Halo juga! Ya masih tersedia. Durian montong kami fresh langsung dari kebun.",
      sender: "seller",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      senderName: "Pak Hasan",
    },
    {
      id: 3,
      text: "Bagaimana dengan kualitasnya? Dan bisa dikirim ke Palangka Raya?",
      sender: "buyer",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      senderName: "Sari Dewi",
    },
    {
      id: 4,
      text: "Kualitas premium, sudah matang pohon. Bisa dikirim ke Palangka Raya, ongkir 15rb.",
      sender: "seller",
      timestamp: new Date(Date.now() - 1000 * 30),
      senderName: "Pak Hasan",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "buyer",
        timestamp: new Date(),
        senderName: "Sari Dewi",
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate seller auto-reply
      setTimeout(() => {
        const autoReply: Message = {
          id: messages.length + 2,
          text: "Terima kasih pesan Anda! Akan saya respon secepatnya.",
          sender: "seller",
          timestamp: new Date(),
          senderName: "Pak Hasan",
        };
        setMessages((prev) => [...prev, autoReply]);
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const selectedChatRoom = chatRooms.find((room) => room.id === selectedChat);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Chat dengan Penjual
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Demo Mode: Chat ini menggunakan data simulasi untuk testing
      </Alert>

      <Box sx={{ display: "flex", height: 600, gap: 2 }}>
        {/* Chat List */}
        <Card sx={{ width: 300, display: { xs: "none", md: "block" } }}>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Daftar Chat
            </Typography>
            <Divider />
            <List>
              {chatRooms.map((room) => (
                <ListItem
                  key={room.id}
                  component="div"
                  onClick={() => setSelectedChat(room.id)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    ...(selectedChat === room.id && {
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
                    }),
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Typography variant="h6">{room.storeAvatar}</Typography>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={room.storeName}
                    secondary={room.lastMessage}
                    secondaryTypographyProps={{
                      noWrap: true,
                      sx: { maxWidth: 180 },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar>
                <Store />
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {selectedChatRoom?.storeName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Online
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Messages */}
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "buyer" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    backgroundColor:
                      message.sender === "buyer" ? "primary.main" : "grey.100",
                    color:
                      message.sender === "buyer"
                        ? "primary.contrastText"
                        : "text.primary",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    {message.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      fontSize: "0.75rem",
                    }}
                  >
                    {message.senderName} • {formatTime(message.timestamp)}
                  </Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Message Input */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                size="small"
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                sx={{ minWidth: "auto", px: 2 }}
              >
                <Send />
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default ChatPage;
