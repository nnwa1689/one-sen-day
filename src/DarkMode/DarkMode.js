import React, { Componen, useState, useRef, useEffect } from 'react';

const DarkMode = ()=>{
    let clickedClass = "button is-dark";
    let unClickedClass ="button is-success is-light";
    const body = document.body;
    const lightTheme = "light";
    const darkTheme = "dark";
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const firstloading = useRef(true);


    body.classList.remove('light');
    body.classList.remove('dark');
  

  
    if (theme === lightTheme || theme === darkTheme) {
      body.classList.add(theme);
    } else {
      body.classList.add(lightTheme);
    }
  
    const switchTheme = e => {
      if (theme === darkTheme) {
        body.classList.replace(darkTheme, lightTheme);
        localStorage.setItem("theme", "light");
        setTheme(lightTheme);
      } else {
        body.classList.replace(lightTheme, darkTheme);
        localStorage.setItem("theme", "dark");
        setTheme(darkTheme);
      }
    }

    return (
        <button
          className={theme !== "dark" ? clickedClass : unClickedClass}
          onClick={e => switchTheme(e)}
        >{theme !== "dark" ? 
        <i className="material-icons">dark_mode</i>
         : <i className="material-icons">light_mode</i>}</button>
      )
}
export default DarkMode;