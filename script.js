let body = document.body;
let toggle = document.querySelector('.toggle');
let navBar = document.querySelector("nav");
let name = document.querySelector('.name');
let favIcon = document.querySelector(".favicon");
let infoContainer = document.querySelector(".info_container");
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
        navBar.style.transform='translateY(-100%)'}
}

let obj= new IntersectionObserver(callBack,object);
obj.observe(infoContainer);

let label=document.querySelectorAll('.label');
let sign=document.querySelectorAll('.sign')
let content=document.querySelectorAll(".content");
let title=document.querySelectorAll(".title")
let border=document.querySelectorAll(".border")
label.forEach((ele,idx) =>{
    ele.addEventListener("click", ()=>{
    if(sign[idx].innerText==='+'){
        content[idx].style.maxHeight=content[idx].scrollHeight+"px";
        sign[idx].innerText='-';
        border[idx].classList.add('cent');
   }else {content[idx].style.maxHeight='0px';
    border[idx].classList.remove('cent');
        sign[idx].innerText='+';
    }})
})


let barticles=document.querySelector(".Articles");
articles.addEventListener("click",scrollToTop);
function scrollToTop(){
    function step(){
        window.scrollBy(0,-100);
        if(window.scrollY>0){ requestAnimationFrame(step)}
    } requestAnimationFrame(step)
};

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
let progressBarWidth=() => {
    let top =-main.getBoundingClientRect().top;
    let totalHeight =main.scrollHeight-document.documentElement.clientHeight;
    let scrollPercent = (top/ totalHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  }

window.addEventListener("scroll", progressBarWidth);

let contents=document.querySelectorAll('.content');
let resizeObject=new ResizeObserver(progressBarWidth);
contents.forEach((content)=>{
resizeObject.observe(content)})