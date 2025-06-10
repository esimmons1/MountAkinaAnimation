// This JavaScript file controls the mountain animation.
// It manages the track drawing and car movement.

class PortfolioApp {
    constructor() {
        // Initializes the application when the page loads.
        this.init();
    }

    init() {
        // Sets up the animated map component.
        this.setupAnimatedMap();
    }

    setupAnimatedMap() {
        // Retrieves the map container element. If not found, the function exits.
        const mapContainer = document.querySelector(".map-container");
        if (!mapContainer) return; 

        // Initiates the circuit animation setup.
        this.createAdvancedCircuitAnimation();
    }

    createAdvancedCircuitAnimation() {
        // Selects the SVG element containing the track.
        const svg = document.querySelector(".circuit-svg");
        if (!svg) return;

        // Defines key SVG elements for the animation:
        // - motionPath: The underlying path for car movement.
        // - progressiveTrack: The visible track that is drawn.
        // - racingCar: The car element.
        // - animationText: The text displayed for restarting the animation.
        const motionPath = svg.querySelector("#racing-track-path");
        const progressiveTrack = svg.querySelector("#progressive-track");
        const racingCar = svg.querySelector("#racing-car");
        const animationText = document.querySelector("#animation-text");
        
        // Logs missing elements and exits if any are not found.
        if (!motionPath || !progressiveTrack || !racingCar || !animationText) {
            console.log("Missing elements:", { motionPath, progressiveTrack, racingCar, animationText });
            return;
        }

        // Calculates the total length of the progressive track for animation calculations.
        const pathLength = progressiveTrack.getTotalLength();
        
        // Configures the progressive track to be initially hidden, ready for drawing.
        progressiveTrack.style.strokeDasharray = pathLength;
        progressiveTrack.style.strokeDashoffset = pathLength;
        
        // Animation parameters:
        // - duration: Time for one complete animation cycle (16 seconds).
        // - pauseDuration: Time the animation pauses at the end of a cycle (3 seconds).
        let duration = 16000;
        let pauseDuration = 3000; 
        let startTime = null; // Tracks the start time of the current animation cycle.
        let textShown = false; // Flag to control display of the restart text.
        let animationId = null; // Stores the animation frame ID.
        let isPaused = false; // Indicates if the animation is currently paused.
        
        // The main animation loop, executed per frame.
        const animate = (currentTime) => {
            // Sets the start time for a new animation cycle.
            if (!startTime) startTime = currentTime;
            
            // Computes elapsed time and animation progress.
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;
            
            // Handles animation completion and pausing.
            if (progress >= 1) {
                if (!isPaused) {
                    isPaused = true;
                    
                    // Ensures the track is fully drawn and the car is at the end position.
                    progressiveTrack.style.strokeDashoffset = 0; 
                    const endPoint = progressiveTrack.getPointAtLength(pathLength);
                    racingCar.setAttribute("transform", 
                        `translate(${endPoint.x}, ${endPoint.y}) rotate(0)`
                    );
                    
                    // Sets a timeout for the pause before restarting the animation.
                    setTimeout(() => {
                        // Hides the restart text for the new cycle.
                        animationText.classList.remove("show");
                        animationText.classList.add("hide");
                        textShown = false;
                        
                        // Resets the track and car to their initial states.
                        progressiveTrack.style.strokeDashoffset = pathLength; 
                        const startPoint = progressiveTrack.getPointAtLength(0);
                        racingCar.setAttribute("transform", 
                            `translate(${startPoint.x}, ${startPoint.y}) rotate(0)`
                        );
                        
                        // Resets start time, unpauses, and requests the next frame.
                        startTime = null;
                        isPaused = false;
                        requestAnimationFrame(animate);
                    }, pauseDuration);
                    return; 
                }
            }
            
            // Displays the restart text when animation progress reaches 20%.
            if (progress >= 0.2 && !textShown) {
                animationText.classList.remove("hide");
                animationText.classList.add("show");
                textShown = true;
            }
            
            // Calculates the portion of the track to be drawn.
            const drawLength = pathLength * progress;
            // Updates the stroke-dashoffset for progressive track drawing.
            progressiveTrack.style.strokeDashoffset = pathLength - drawLength;
            
            // Determines the current position of the car on the track.
            const point = progressiveTrack.getPointAtLength(drawLength);
            
            // Determines a slightly advanced point for car rotation calculation.
            const nextPoint = progressiveTrack.getPointAtLength(
                drawLength + 1 < pathLength ? drawLength + 1 : 0
            );
            
            // Calculates the rotation angle for the car.
            const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
            
            // Applies position and rotation to the car.
            racingCar.setAttribute("transform", 
                `translate(${point.x}, ${point.y}) rotate(${angle})`
            );
            
            // Continues the animation if not paused.
            if (!isPaused) {
                animationId = requestAnimationFrame(animate);
            }
        };
        
        // Initiates the animation.
        requestAnimationFrame(animate);
        
        // Adds a click event listener to restart the animation.
        svg.addEventListener("click", () => {
            // Resets pause state if active.
            if (isPaused) {
                isPaused = false;
            }
            startTime = null; // Resets the animation start time.
            // Hides the restart text and resets its flag.
            animationText.classList.remove("show");
            animationText.classList.add("hide");
            textShown = false;
            // Restarts the animation immediately.
            requestAnimationFrame(animate);
        });
        
        // Adds hover effect to slightly scale up the SVG on mouse entry.
        svg.addEventListener("mouseenter", () => {
            svg.style.transform = "scale(1.02)";
            svg.style.transition = "transform 0.3s ease";
        });

        // Resets SVG scale on mouse exit.
        svg.addEventListener("mouseleave", () => {
            svg.style.transform = "scale(1)";
        });
    }
}

// Creates a new instance of PortfolioApp to run the application.
new PortfolioApp();

