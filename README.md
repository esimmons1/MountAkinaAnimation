Mount Akina Animation
=============

Made by: Ellis Simmons, June 2025      
Language: HTML, CSS, JavaScript (SVG)

---

What this is?    
-----------------------------------
This is a web-based visual animation project that simulates a car driving along the iconic touge of Mount Akina from the popular anime and manga series Initial D. The animation progressively draws the mountain pass and features a car moving along the path.

---

What it does:  
---------------------------------------
- **Progressive Track Drawing**: The animation dynamically draws the Mount Akina track using SVG, revealing the path as the car progresses.
- **Animated Racing Car**: A simple rectangular 'car' element moves along the drawn track, simulating a race.
- **Location Display**: Text indicating "Mount Akina, Takasaki, Gunma Prefecture" appears during the animation.
- **Interactive Restart**: The animation pauses at the end of each cycle, and users can click anywhere on the SVG to restart it.
- **Hover Effects**: The SVG scales slightly on mouse hover, providing a subtle interactive element.

---

How to run it:  
-----------------------------------------------
To run this animation, simply open the `index.html` file in any modern web browser. No special setup or server is required.      
You can also visit: https://esimmons1.github.io/MountAkinaAnimation/

---

How it works:  
-------------------------------
- **HTML (`index.html`)**: Defines the basic structure of the web page, including the SVG container for the track and car, and a div for the animation text.
- **CSS (`style.css`)**: Styles the appearance of the page, the SVG elements, and controls the visual effects like the text fade-in/out and SVG hover.
- **JavaScript (`script.js`)**: Contains the core logic for the animation:
  - Calculates the length of the SVG path to control the progressive drawing.
  - Uses `stroke-dasharray` and `stroke-dashoffset` properties to animate the track drawing.
  - Determines the car's position and rotation along the path using `getPointAtLength` and `atan2`.
  - Manages the animation loop using `requestAnimationFrame` for smooth performance.
  - Implements a pause at the end of each animation cycle and handles the restart functionality via a click event listener.
  - Controls the visibility and styling of the location text.

---

Why I made it:  
--------------------------------------
This project was created to bring a piece of the Initial D world to life through web animation. It serves as a creative exercise in SVG manipulation and JavaScript animation, aiming to capture the essence of the iconic Mount Akina downhill. I also wanted to have an animation on my website and I thought this would look cool.

---

Stuff you can mess with:  
-------------------------------------------
In `script.js`, you can modify the following variables to alter the animation behavior:
```javascript
- duration: 16000; // Time for one complete animation cycle in milliseconds (default: 16 seconds)
- pauseDuration: 3000; // Time the animation pauses at the end of a cycle in milliseconds (default: 3 seconds)
```

---

Sources & Inspiration:  
------------------------------------------------
- Initial D (manga and anime series)
- Mount Akina (Haruna), Gunma Prefecture, Japan
- https://animejs.com, used their createmotionpath animation as a base for the project (They have a ton of really sick animations)

---

As per usual, if you're going to steal or use it at least credit me please. Thank you for reading and have a nice day.
