const wrapperOpenCase = document.querySelector('.wrapper-open');

const caseItems = {
    'Золотая спираль' : [1, 'secert'],
    'Азимов' : [2, 'secret'],
    'Песчаная буря' : [3, 'ibd'],
    'Злобный дайме' : [4, 'epic'],
    'Падение икара' : [5, 'epic'],
    'Рентген' : [6, 'secret'],
    'Безлюдный космос' : [7, 'epic'],
    'Пиксельный камуфляж' : [8, 'ibd'],
    'Смерч' : [9, 'ibd'],     
    'Чистая вода' : [10, 'ibd'],     
    'Смешанный камуфляж' : [11, 'ibd'],
    'Центральный процессор' : [12, 'ibd'],
    'Брифинг' : [13, 'ibd'],
    'Кровавый тигр' : [14, 'ibd'],
}

const rareColorWeapon = {
    'secert' : 'rgba(255, 2, 2, 0.716)',
    'epic' : 'rgba(196, 2, 255, 0.716)',
    'rare' : 'rgba(61, 2, 255, 0.716)',
    'ibd' : 'rgba(2, 192, 255, 0.716)'
}

// Function get

function getNewCaseItem(name, img, rare){
    return (
        `
        <div style='background: linear-gradient(#111, ${rare});' class="item-case">
            <div class="item-img">
                <img src="img/Case-M4/inside/${img}.png" alt="${img}">
            </div>
            <div class="item-name">${name}</div>
        </div>
        `
    )
}

function getColorRare(rare){
    for( let key in rareColorWeapon ){
        if( key == rare ){
            return (rareColorWeapon[key])
        }
    }
}

function getLengthObj(obj){
    let lengthObj = 0;
    for( let key in obj ){
        lengthObj++
    }

    return lengthObj;
}

function getRandomWeapon(){
    let rand = Math.floor(Math.random() * (getLengthObj(caseItems))) + 1
    for( let key in caseItems ){
        if( caseItems[key][0] == rand ){

            const nameItem = key,
                  numberItem = caseItems[key][0],
                  rareColorItem = getColorRare(caseItems[key][1]),
                  rareColorItemBorder = getColorRare(caseItems[key][1]);

            return [nameItem, numberItem, rareColorItem]
        }
    }
}

// Audio

function audioGrabWeapon(){
    let grabWeapon   = new Audio(`audio/grabWeapon.mp3`);
    grabWeapon.volume = 0.3;
    grabWeapon.play();
}

function audioTwistOne(){
    let twist   = new Audio(`audio/oneTwist.mp3`);
    twist.volume = 0.3;
    twist.play();
}

function audioOpenCase(){
    let openCase   = new Audio(`audio/clickCase.mp3`);
    openCase.volume = 0.3;
    openCase.play();
}

// Twist

let valueTwistCase = 0,
    valueSpeedTwistCase = 15,
    changeOpenCase = true;


function addNewCaseItem(){
    let randomWeapon = getRandomWeapon();
    try{wrapperOpenCase.innerHTML += getNewCaseItem( randomWeapon[0], randomWeapon[1], randomWeapon[2]);}catch{}
    twistCase();
}

function twistCase(){
    valueTwistCase = valueTwistCase - 1;
    wrapperOpenCase.style.transform = `translateX(${valueTwistCase}px)`
}

function getUpdateSpeedTwist(){
    setTimeout(()=>{
        valueSpeedTwistCase++

    }, 1500)

    return valueSpeedTwistCase;
}

function takeWinWeapon(){
    const winLine = document.querySelector('.win-line'),
          itemsCase = document.querySelectorAll('.item-case');

    itemsCase.forEach(elem =>{
        const elemCaseInfo = elem.getBoundingClientRect(),
              winLineInfo = winLine.getBoundingClientRect();

        if( winLineInfo.x > elemCaseInfo.x &&
            winLineInfo.x < (elemCaseInfo.x + elemCaseInfo.width) ){

                elem.style.height = '30vw'
                winLine.style.display = 'none'
        }
    })
}

function twist(){
        setTimeout(()=>{
            if( getUpdateSpeedTwist() < 60 ){ // How long twist case
                audioTwistOne()
                addNewCaseItem()
                twist()
            }else{
                setTimeout(()=>{
                    // If twist - stop 
                    audioGrabWeapon()
                    takeWinWeapon()
                    changeOpenCase = true;
                }, 2000)
                return false
            }
        }, 1)
}

function startNewGame(){

    audioOpenCase()

    const winLine = document.querySelector('.win-line')
    winLine.style.display = 'block'

    wrapperOpenCase.innerHTML = '';
    wrapperOpenCase.style.transform = 'translateX(0px)'

    valueTwistCase = 0;
    valueSpeedTwistCase = 15;
    
    twist()
}

// Button start twist case

const buttonCaseOpen = document.querySelector('.button-case-open');

window.addEventListener('keypress', event=>{
    if( event.key == ' ' || event.key == 'Enter' ){
        if( changeOpenCase == true ){
            startNewGame()
            changeOpenCase = false;
        }
    }
})

window.addEventListener('click', event =>{
        if( changeOpenCase == true ){
            startNewGame()
            changeOpenCase = false;
        }
})