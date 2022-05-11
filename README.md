# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Implentation:

1. Implement a count for turn
	this.state = {
        turn: 0,
        squares: Array(9).fill(null),
        xIsNext: true,
      };

2. Made it so you can't place any new 'X' or 'O' after turn 6
	if (this.state.turn > 5 && squares[i] == null) {
          return;
      }

3. Made it so you can chose which existing X's or O's to move
	if (this.state.selectedNext === false && this.openAdj(i)) {
            squares[i] = "'" + squares[i] + "'";
            this.setState({
                prevI: i,
                selectedNext: true,
                squares: squares,
            });       
          }

4. Made it so you can change the selection if it is not moved yet
	else if (this.state.selectedNext === true && this.openAdj(i) &&
               i !== this.state.prevI) {
            const mark = Array.from(squares[this.state.prevI]);
            squares[i] = "'" + squares[i] + "'";
            squares[this.state.prevI] = mark[1];
            this.setState({
                prevI: i,
                selectedNext: true,
                squares: squares,
    
            });
          }

5. Made a function that checks for adjacent openings
	openAdj(i) {
        const squares = this.state.squares;
        if (i === 0 && (!squares[1] || !squares[3] || !squares[4])) return true;
        if (i === 1 && ( squares[6] ||  squares[7] ||  squares[8])) return true;
        if (i === 2 && (!squares[1] || !squares[4] || !squares[5])) return true;
        if (i === 3 && ( squares[2] ||  squares[5] ||  squares[8])) return true;
        if (i === 4) return true;
        if (i === 5 && ( squares[0] ||  squares[3] ||  squares[6])) return true;
        if (i === 6 && (!squares[3] || !squares[4] || !squares[7])) return true;
        if (i === 7 && ( squares[0] ||  squares[1] ||  squares[2])) return true;
        if (i === 8 && (!squares[4] || !squares[5] || !squares[7])) return true;
        return false;        
    }

6. Made a function that checks for valid adjacent destinations
	validDest(i, j) {
        if ( Math.abs(i - j) === 3 || ( Math.abs(i - j) === 1 &&
	     (i + j !== 7 && i + j !== 13))) return true;
        if ( Math.abs(i - j) === 4 || ( Math.abs(i - j) === 2 &&
           (i + j !== 4 && i + j !== 10 && i + j !== 16))) return true;
        return false;
    }

7. Implement the "moving" of the X's or O's
	const mark = Array.from(squares[this.state.prevI]);
        let flag = true;
        if ((squares[4] === 'X' && this.state.xIsNext === true) ||
             (squares[4] === 'O' && this.state.xIsNext === false))
            flag = false;
        squares[i] = mark[1];
        squares[this.state.prevI] = null;
        if (this.validDest(i + 1, this.state.prevI + 1) && 
           (calculateWinner(squares) || (flag))) {
            this.setState({
                prevI: -1,
                selectedNext: false,
                squares: squares,
                xIsNext: !this.state.xIsNext,
            });
        }

8. Making sure that during X turn, only X's can be selected
	if ((this.state.xIsNext === true && squares[i] === 'O') ||
          (this.state.xIsNext === false && squares[i] === 'X'))
            return;

9. Done


HOW TO PLAY:

1. cd into chorus-lappilli and npm start to launch the game

2. X goes first, simply click one of the 9 squares to place your position

3. Then it's O's turn. O selects an open square. This repeats for 6 turns.

4. After 3 X's and 3 O's are on the board, no more marks can be placed.

5. To continue, the next player must click one of his or her marks.

6. The selected mark will be indicated with a 'X' or 'O'.

7. Only marks with existing adjacent empty tiles can be selected

8. If the mark is selected but have not been moved, but player is free
   to chose another legal mark.

9. After this, the player can chose to move the mark into an adjacent
   empty tile.

10. If one of the player's marks is in the center square, the player
    must either win or vacate the center square with their move

11. This cycles among the two players until there is a winner.



npm pack --dry-run:

npm notice 
npm notice 📦  chorus-lappilli@0.1.0
npm notice === Tarball Contents ===
npm notice 3.4kB  README.md
npm notice 23.6kB chorus-lappilli-0.1.0.tgz
npm notice 818B   package.json
npm notice 3.9kB  public/favicon.ico
npm notice 1.7kB  public/index.html
npm notice 5.3kB  public/logo192.png
npm notice 9.7kB  public/logo512.png
npm notice 492B   public/manifest.json
npm notice 67B    public/robots.txt
npm notice 789B   src/index.css
npm notice 5.7kB  src/index.js
npm notice === Tarball Details ===
npm notice name:          chorus-lappilli
npm notice version:       0.1.0
npm notice filename:      chorus-lappilli-0.1.0.tgz
npm notice package size:  47.3 kB
npm notice unpacked size: 55.4 kB
npm notice shasum:        d7fad8b237033aa2bbaf9c73d88751744c819d27
npm notice integrity:     sha512-6ljdpM7I9n6gM[...]ToPr4q8Pd9Sog==
npm notice total files:   11
npm notice
	
	

