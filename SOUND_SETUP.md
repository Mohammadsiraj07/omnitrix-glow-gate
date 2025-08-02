# Omnitrix Transformation Sound

To enable the Ben 10 transformation sound effect, you need to add a sound file to the project.

## Required Sound File

Place a file named `transform.mp3` in the `public/sounds/` directory.

The sound should be:
- Duration: ~0.8-1.0 seconds
- Format: MP3
- Volume: Moderate (the code sets volume to 0.7)
- Content: Ben 10 Omnitrix transformation sound effect

## Sound File Path
```
public/
  sounds/
    transform.mp3  <- Add this file
```

## How it works

When a user clicks on any alien card:
1. The transformation effect triggers (neon green flash + energy pulse)
2. The sound plays automatically
3. The effect lasts for 800ms
4. If the sound file is missing, the visual effect still works

## Example Sound Sources
You can find Ben 10 transformation sounds from:
- Official Ben 10 episodes
- Fan-made sound effects
- Free sound libraries with similar sci-fi transformation sounds

## Volume Control
The volume is set to 0.7 (70%) in the code. You can adjust this in `src/pages/Index.tsx`:
```javascript
audio.volume = 0.7; // Change this value (0.0 to 1.0)
```
