try{
    const link = document.createElement("link");
    link.rel = "icon";
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        link.href = './bilder/FEdark.svg';
    }
    else{
        link.href = './bilder/FE.svg';
    }
    document.head.appendChild(link);
}
catch(e){
    console.log(e);
}