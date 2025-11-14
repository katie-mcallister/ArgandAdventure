let grassBlades = [];
let bushes = [];
let trees = [];
let rocks = [];
let snowTrees = [];

let connectAnimationProgress = 0;   
let connectingTreasures = false;   
let connectionOrder = [];           
let pulseOffset = 0; 

let keysHeld = {};
let moveInterval = 175; 
let lastHeldMove = 0;

const bladesPerSquare = 5;
const towerPosition = { re: 3, im: -2 };

let isIntroOpen = false;
let isPopupOpen = false;
let towerCompleted = false;

let scale = 60;
let cellSize = scale; 
let player = { re: 0, im: 0 };
let treasures = [];
let gridSize = 5;
let gemImg, playerImg, towerImg, fragKeyImg,bushImg, treeImg;

let lastMoveTime = 0;
const shakeDuration = 300;
const shakeAmplitude = 5;

let treasuresCollected = 0;
let waitingForAnswer = false;

let currentTreasureIndex = null;
let currentCorrectRe = 0;
let currentCorrectIm = 0;
let currentCorrectR = 0;
let currentCorrectTheta = 0; 
let cancelledTreasureIndex = null;
let cancelledTower = false;
let treasureQueue = [];
let treasureClickEnabled = false;

const match = window.location.pathname.match(/index(\d+)\.html$/);
const levelNumber = match ? parseInt(match[1]) : 0;

window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d","W","A","S","D"].includes(e.key)) {
        e.preventDefault();
    }
}, false);

let towerPulseAmplitude = 0.1; 
let towerPulseSpeed = 0.35;   
let towerPulseTime = 0; 
let towerPulseStart = null;    
let towerPulseDuration = 4000;
let towerPulseAmplitudeMax = 0.2;  
let isTowerPulsing = false;
