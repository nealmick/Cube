# Rubik's Cube!
 
#### Solves itself instantly and is rendered in-browser with intuitive controls



The 3 x 3 cube has more possible states than grains of sand in all of earth's deserts (10^40). To solve a cube you must find a sequence of turns that unscramble it.  This solve method is broken down into stages, solving one part of the cube at a time: first the top cross, then top corners, then middle sides, and so on... In each step, only one piece is solved at a time. This is done by first locating the piece and, based on where the piece was found, the algorithm begins to move toward a solved state.  The program can solve any valid 3 x 3 cube just about instantly. The cube is then played back with delays between each move.  Active state of the cube is stored using a 6 x 3 x 3 array. Each index of the array contains one character representing a color. All turn-algorithms are executed on the array first, then the 3D cube is updated to match the correct cube state.  The cube is rendered using the JavaScript library Three.js.  There were several difficult problems in this project, including figuring out how to fix disrupted pieces by parodying each step. In the future I would like to work on making the algorithm solve larger cubes.


#### Files:
1. cube.html - main html file
2. cube.js - main logic for cube generation, turn, solve, threejs, camera, scene, etc...
3. style.css - color and styling
 

# Check out live version here:   https://nealmick.com/cube/


<img src="https://media.giphy.com/media/VFxAFcJqEwcd8gx8A5/giphy.gif" width="400" height="400" />

