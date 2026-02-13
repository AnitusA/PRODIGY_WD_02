class Stopwatch {
    constructor() {
        this.time = 0; // Time in milliseconds
        this.interval = null;
        this.running = false;
        this.laps = [];
        
        // Get DOM elements
        this.timeDisplay = document.getElementById('timeDisplay');
        this.startStopBtn = document.getElementById('startStopBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapTimes = document.getElementById('lapTimes');
        this.lapTitle = document.getElementById('lapTitle');
        
        // Bind event listeners
        this.bindEvents();
        
        // Initialize display
        this.updateDisplay();
    }
    
    bindEvents() {
        this.startStopBtn.addEventListener('click', () => this.toggleStartStop());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
    }
    
    start() {
        if (!this.running) {
            this.running = true;
            this.interval = setInterval(() => {
                this.time += 10; // Increment by 10ms for smooth display
                this.updateDisplay();
            }, 10);
            
            // Update button states
            this.startStopBtn.textContent = 'Stop';
            this.startStopBtn.classList.add('stop');
            this.pauseBtn.disabled = false;
            this.lapBtn.disabled = false;
        }
    }
    
    stop() {
        if (this.running) {
            this.running = false;
            clearInterval(this.interval);
            
            // Update button states
            this.startStopBtn.textContent = 'Start';
            this.startStopBtn.classList.remove('stop');
            this.pauseBtn.disabled = true;
            this.lapBtn.disabled = true;
        }
    }
    
    toggleStartStop() {
        if (this.running) {
            this.stop();
        } else {
            this.start();
        }
    }
    
    pause() {
        if (this.running) {
            this.stop();
            this.startStopBtn.textContent = 'Resume';
        }
    }
    
    reset() {
        this.stop();
        this.time = 0;
        this.laps = [];
        this.updateDisplay();
        this.updateLapDisplay();
        
        // Reset button states
        this.startStopBtn.textContent = 'Start';
        this.startStopBtn.classList.remove('stop');
        this.pauseBtn.disabled = true;
        this.lapBtn.disabled = true;
        
        // Hide lap section
        this.lapTitle.style.display = 'none';
    }
    
    recordLap() {
        if (this.running) {
            const lapTime = this.time;
            const lapNumber = this.laps.length + 1;
            this.laps.push({
                number: lapNumber,
                time: lapTime,
                formattedTime: this.formatTime(lapTime)
            });
            
            this.updateLapDisplay();
            
            // Show lap section if hidden
            this.lapTitle.style.display = 'block';
        }
    }
    
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
    }
    
    updateDisplay() {
        this.timeDisplay.textContent = this.formatTime(this.time);
    }
    
    updateLapDisplay() {
        this.lapTimes.innerHTML = '';
        
        // Display laps in reverse order (most recent first)
        const reversedLaps = [...this.laps].reverse();
        
        reversedLaps.forEach(lap => {
            const lapElement = document.createElement('div');
            lapElement.className = 'lap-time';
            
            lapElement.innerHTML = `
                <span class="lap-number">Lap ${lap.number}</span>
                <span class="lap-time-value">${lap.formattedTime}</span>
            `;
            
            this.lapTimes.appendChild(lapElement);
        });
    }
    
    // Additional utility methods
    getTotalTime() {
        return this.time;
    }
    
    getFormattedTime() {
        return this.formatTime(this.time);
    }
    
    getLaps() {
        return this.laps;
    }
    
    isRunning() {
        return this.running;
    }
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.stopwatch = new Stopwatch();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'Space':
                event.preventDefault();
                window.stopwatch.toggleStartStop();
                break;
            case 'KeyP':
                event.preventDefault();
                window.stopwatch.pause();
                break;
            case 'KeyR':
                event.preventDefault();
                window.stopwatch.reset();
                break;
            case 'KeyL':
                event.preventDefault();
                window.stopwatch.recordLap();
                break;
        }
    });
});

// Add some additional features for enhanced user experience
class StopwatchStats {
    constructor(stopwatch) {
        this.stopwatch = stopwatch;
    }
    
    getFastestLap() {
        if (this.stopwatch.laps.length === 0) return null;
        
        let fastest = this.stopwatch.laps[0];
        let fastestInterval = this.stopwatch.laps[0].time;
        
        for (let i = 1; i < this.stopwatch.laps.length; i++) {
            const interval = this.stopwatch.laps[i].time - this.stopwatch.laps[i-1].time;
            if (i === 1) fastestInterval = interval;
            
            if (interval < fastestInterval) {
                fastestInterval = interval;
                fastest = this.stopwatch.laps[i];
            }
        }
        
        return {
            lap: fastest,
            interval: fastestInterval,
            formattedInterval: this.stopwatch.formatTime(fastestInterval)
        };
    }
    
    getSlowestLap() {
        if (this.stopwatch.laps.length === 0) return null;
        
        let slowest = this.stopwatch.laps[0];
        let slowestInterval = this.stopwatch.laps[0].time;
        
        for (let i = 1; i < this.stopwatch.laps.length; i++) {
            const interval = this.stopwatch.laps[i].time - this.stopwatch.laps[i-1].time;
            if (i === 1) slowestInterval = interval;
            
            if (interval > slowestInterval) {
                slowestInterval = interval;
                slowest = this.stopwatch.laps[i];
            }
        }
        
        return {
            lap: slowest,
            interval: slowestInterval,
            formattedInterval: this.stopwatch.formatTime(slowestInterval)
        };
    }
    
    getAverageLapTime() {
        if (this.stopwatch.laps.length <= 1) return null;
        
        const totalInterval = this.stopwatch.laps[this.stopwatch.laps.length - 1].time;
        const averageInterval = totalInterval / this.stopwatch.laps.length;
        
        return {
            average: averageInterval,
            formattedAverage: this.stopwatch.formatTime(averageInterval)
        };
    }
}