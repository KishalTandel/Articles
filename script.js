let body = document.body;
let toggle = document.querySelector('.toggle');
let navBar = document.querySelector("nav");
let name = document.querySelector('.name');
let favIcon = document.querySelector(".favicon");
let infoContainer = document.querySelector(".info_container");
let quoteContainer = document.querySelector(".quote_container")
let cards = document.querySelectorAll(".card");
let subLinks = document.querySelectorAll(".web_link p");
let subNav = document.querySelector(".sub_nav");
let quotation = document.querySelector('.quotation');
let author = document.querySelector('.author');
let darkIcon = document.getElementById('dark_icon');
let lightIcon = document.getElementById('light_icon');
let darkToggle = document.getElementById("dark_toggle");
let lightToggle = document.getElementById("light_toggle");
let storedTheme = localStorage.getItem('theme');
let isSystemModeDark = window.matchMedia('(prefers-color-scheme:dark)').matches;

let rotation=0;
let setTheme = (theme) => {
   if (theme === 'dark'){
       body.classList.remove("light")
       body.classList.add("dark")
       darkIcon.classList.remove('hidden');
       lightIcon.classList.add('hidden');
       darkToggle.classList.remove('hidden');
       lightToggle.classList.add("hidden");
    } else{
        body.classList.remove("dark")
        body.classList.add("light")
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
        darkToggle.classList.add('hidden');
        lightToggle.classList.remove("hidden");
    }
    rotation += 360;
    toggle.style.transform = `rotate(${rotation}deg)`;
}

if (storedTheme){
    setTheme(storedTheme);
} else if(isSystemModeDark){
    setTheme('dark');
} else {
    setTheme('light');
}

favIcon.addEventListener('click', () => {
    let newTheme=body.classList.contains('dark') ? 'light' : 'dark' ;
    setTheme(newTheme);
    localStorage.setItem('theme' , newTheme) ;
});

toggle.addEventListener('click' , () => {
    let newTheme=body.classList.contains('dark') ? 'light' : 'dark' ;
    setTheme(newTheme);
    localStorage.setItem('theme' , newTheme);
});

let object;

let callBack= (entries) => {
    if (!(entries[0].isIntersecting)){
        navBar.style.transform='translateY(0%)';
        }else{
        navBar.style.transform='translateY(-100%)'
}}

let obj= new IntersectionObserver(callBack,object);
obj.observe(infoContainer);

let storedIndex=-1;
let isSame=-1;
let runTimeout=[];

let getQuote = () => {
    do{
        index=Math.floor(Math.random()*(quotes.length)); 
    } while(index===isSame || index===localStorage.getItem('index'));
    localStorage.setItem('index', index);
        runTimeout.forEach((timeout)=>{clearTimeout(timeout)});
        runTimeout=[];
        quotation.innerText='';
        let str=quotes[index].quote;
        let arr=str.split('');
        arr.forEach((letter,idx)=>{
        let timeout=setTimeout(()=>{
        quotation.innerText=quotation.innerText+letter;
        },10*idx);runTimeout.push(timeout);})
        author.innerText='\u2014'+' '+quotes[index].author;
        isSame=index;
    }
    
quoteContainer.addEventListener('click', () => {
   getQuote();
});

let papers=document.querySelector('.Papers')
papers.addEventListener('click', scrollToTop);

function scrollToTop(){
    function step(){
        window.scrollBy(0,-100);
        if(window.scrollY>0){ requestAnimationFrame(step)}
    } requestAnimationFrame(step)
};

window.addEventListener('load', () => {
    getQuote();
});

let tooltip=document.querySelector('.tooltip');

let runTimeOut=[];
toggle.addEventListener('mouseover',(e)=>{
    let timeOut=setTimeout(()=>{
        tooltip.style.left=`${e.clientX-23}px`;
        tooltip.style.top=`${e.clientY+23}px`;
    tooltip.classList.remove('hidden')},850)
    runTimeOut.push(timeOut);
})

toggle.addEventListener('mouseleave',()=>{
    runTimeOut.forEach((timeOut)=>{
        clearTimeout(timeOut);
    })
    runTimeOut=[]
    tooltip.classList.add('hidden');
})

let progressBar=document.querySelector('.progress_bar')
let main=document.querySelector('main')
let footer=document.querySelector('footer')
window.addEventListener("scroll", () => {
    let top =-main.getBoundingClientRect().top;
    let totalHeight =main.scrollHeight+footer.scrollHeight-document.documentElement.clientHeight;
    let scrollPercent = (top/ totalHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });
