# IT Field Checklist

## Problem
Field techs visiting multiple sites (offices, warehouses, branches) need a fast way to confirm
what's been checked at each stop, network, backups, physical assets, printers, access, without
relying on paper forms or a spreadsheet that isn't handy when you're standing in a server closet.

## Solution
A mobile checklist app for site visits, built with React Native and Expo. Each site has its own
recurring checklist, techs tap through items as they complete them, add site-specific items on the
fly, and mark a visit complete, which logs the date and resets the checklist for next time. It's a
fully working app, not a static mockup, with data persisted on-device.

## Key features
A site list with a live progress bar per site (X/Y tasks done) and last-visit date, a per-site
checklist where techs tap to check off items and add custom items mid-visit with strike-through for
completed tasks, a Mark visit complete flow that logs today's date as the last visit and resets the
checklist so the next visit starts fresh, the ability to add new sites on the fly with name and
address, on-device persistence via AsyncStorage so progress survives app restarts without a
backend, and a clean, readable UI designed for quick glances in the field.

## Tech stack
React Native, Expo, TypeScript, AsyncStorage

## Running it
```
npm install
npx expo start
```
Then scan the QR code with Expo Go (iOS/Android), or press 'w' for web.

## Why this matters for clients
This shows I can build beyond scripts and web apps into mobile, the same skills clients ask for
when they want a small internal tool their team can use on a phone: a field-service checklist, an
inventory scanner, a shift log, a quick-report app. It also shows I can design something that holds
up on a small screen, not just a desktop layout.

---
Personal/demo project. Data is sample data stored on-device (AsyncStorage), no backend behind
it. Happy to wire this into a real ticketing/asset system or a shared backend (so multiple techs
see the same site data) on a client project.
