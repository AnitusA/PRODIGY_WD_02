# Stopwatch Web Application

A modern, interactive stopwatch web application built with HTML, CSS, and JavaScript. This application provides accurate time measurement with an intuitive user interface and advanced features.

## Features

### Core Functionality
- **Start/Stop**: Begin and end time measurement
- **Pause/Resume**: Temporarily pause the timer and resume from where it left off
- **Reset**: Reset the timer back to 00:00:00
- **Lap Times**: Record and display lap times during operation

### User Interface
- Clean, modern design with gradient background
- Responsive layout that works on desktop and mobile
- High-precision time display (minutes:seconds:centiseconds)
- Color-coded control buttons for easy identification
- Animated lap time entries

### Advanced Features
  - `Space` - Start/Stop toggle
  - `P` - Pause
  - `R` - Reset
  - `L` - Record Lap
- **High Precision**: 10ms interval updates for smooth display
- **Lap Statistics**: Built-in methods to calculate fastest, slowest, and average lap times

## How to Use

1. **Starting the Stopwatch**:
   - Click the "Start" button or press the spacebar
   - The timer will begin counting up from 00:00:00

2. **Recording Lap Times**:
   - While the stopwatch is running, click "Lap" or press 'L'
   - Lap times will appear below the controls
   - Most recent laps are shown at the top

3. **Pausing**:
   - Click "Pause" or press 'P' to temporarily stop the timer
   - Click "Resume" to continue from where it was paused

4. **Stopping**:
   - Click "Stop" to end the current timing session
   - You can then start a new session or reset

5. **Resetting**:
   - Click "Reset" or press 'R' to clear all times
   - This will reset the timer to 00:00:00 and clear all lap times

## File Structure

```
stopwatch-app/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This documentation file
```

## Technical Details

### Time Format
- Display format: `MM:SS:CS` (Minutes:Seconds:Centiseconds)
- Internal precision: 10 milliseconds
- Range: 00:00:00 to 99:59:99

### Browser Compatibility
- Modern browsers supporting ES6 classes
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android

### Performance
- Lightweight: No external dependencies
- Optimized DOM updates
- Efficient interval management

## Customization

### Styling
Modify `styles.css` to change:
- Color scheme
- Button styles
- Layout and spacing
- Animations

### Functionality
Extend `script.js` to add:
- Different time formats
- Export lap times
- Sound notifications
- Custom keyboard shortcuts

## Class Structure

### Stopwatch Class
Main class handling all timer functionality:
- Time tracking and display
- Button state management
- Lap time recording
- Event handling

### StopwatchStats Class
Utility class for lap time analysis:
- Fastest lap calculation
- Slowest lap calculation
- Average lap time calculation

## Getting Started

1. Download all files to a local directory
2. Open `index.html` in a web browser
3. Start using the stopwatch immediately

No installation or compilation required!

## Future Enhancements

Potential features for future versions:
- Split time vs total time display
- Export lap times to CSV
- Custom time formats
- Sound alerts
- Multiple stopwatch instances
- Persistence across browser sessions

## License

This project is open source and available under the MIT License.