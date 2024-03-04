import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./src/pages/Login";
import { CurrentUserProvider } from "./src/contexts/CurrentUserContext";
import { SocketProvider } from "./src/contexts/SocketContext";
import Registration from "./src/pages/Registration";
import { ChatProvider } from "./src/contexts/ChatContext";
import NotFound from "./src/components/NotFound";
import Warning from "./src/components/Warning";

const element = document.getElementById("chat");

const root = ReactDOM.createRoot(element);

const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Warning />,
  },
  {
    path: "/registration",
    element: <Registration />,
    errorElement: <Warning />,
  },
  {
    path: "/chats",
    element: <App />,
    errorElement: <Warning />,
  },
  {
    path: "/chats/:receiver_id",
    element: <App />,
    errorElement: <Warning />,
  },
]);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <SocketProvider>
      <CurrentUserProvider>
        <ChatProvider>
          <RouterProvider router={routerProvider} />
        </ChatProvider>
      </CurrentUserProvider>
    </SocketProvider>
  </QueryClientProvider>
);
