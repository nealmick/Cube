# Cube Solver

Rubiks cube that solves it self instantly.

<img src="https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif" width="200" height="200" />


The cube is rendered using the JavaScript library Three.js. Active state of the cube is stored using a 6 x 3 x 3 array. Each index of the array contains one character representing a color. All turn-algorithms are executed on the array first, then the 3D cube is updated to match the correct cube state. Solving the cube takes place in several stages: first the top cross, then top corners, then middle sides, and so on... In each step, only one piece is solved at a time. This is done by first locating the piece and, based on where the piece was found, the algorithm begins to move the piece toward a stored location. Once at the particular stored location, the piece can then be solved with a few basic algorithms. The program can solve any valid 3 x 3 cube just about instantly. There were several difficult problems in this project, including figuring out how to fix disrupted pieces by parodying each step. In the future I would like to work on making the algorithm solve larger cubes.

check out live version here:
#### https://nealmick.com/cube/
