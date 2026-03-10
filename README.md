# Shelby AI Social Feed

AI-powered social feed backend prototype inspired by Shelby’s hot-storage vision.

## Overview

This project demonstrates a simple backend that generates AI-style posts and serves them through a fast feed API.

It is designed as a prototype for how Shelby-like infrastructure can power:

- AI-generated media
- social feeds
- dynamic content platforms
- high-throughput applications

## Features

- Generate feed items with `POST /generate`
- Manually upload content with `POST /upload`
- Retrieve feed with `GET /feed`

## API

### Health Check
GET /

### Generate Post
POST /generate

Example body:

{
 "topic": "crypto"
}

### Upload Content
POST /upload

Example body:

{
 "topic": "general",
 "text": "Hello from Shelby demo",
 "fileUrl": "https://example.com/file.png"
}

### Get Feed
GET /feed

## Demo

http://178.104.37.132:3001/feed
