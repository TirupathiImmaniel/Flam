🧠 Architecture – Real-Time Collaborative Drawing Canvas

This document explains the system design, data flow, WebSocket protocol, undo/redo strategy, performance decisions, and conflict handling used in the Real-Time Collaborative Drawing Canvas project.

The goal of this architecture is to ensure:

Real-time synchronization

Global consistency

High performance

Clear and explainable logic

🏗️ High-Level Architecture

The application follows a client–server real-time architecture:

┌────────────┐        WebSockets        ┌──────────────┐
│  Client A  │  <------------------->   │              │
├────────────┤                          │              │
│  Client B  │  <------------------->   │   Server     │
├────────────┤                          │ (Node + WS)  │
│  Client C  │  <------------------->   │              │
└────────────┘                          └──────────────┘


The server is the single source of truth

All drawing state is owned and synchronized by the server

Clients render canvas state based on server updates

🔄 Data Flow Diagram
Drawing Flow (Brush / Eraser)
User Pointer Move
      ↓
Create / Update Stroke (Client)
      ↓
Emit stroke:add (WebSocket)
      ↓
Server stores stroke in global history
      ↓
Broadcast stroke:add to other clients
      ↓
Other clients render stroke immediately

Undo / Redo Flow
User clicks Undo
      ↓
Emit undo (WebSocket)
      ↓
Server updates global stroke history
      ↓
Server emits canvas:sync
      ↓
All clients clear canvas
      ↓
All clients replay strokes in order

📡 WebSocket Protocol
Connection Events
connection

Triggered when a user connects.

Assigns unique user ID

Assigns unique cursor color

Sends current canvas state

disconnect

Triggered when a user disconnects.

Removes user from online list

Notifies remaining clients