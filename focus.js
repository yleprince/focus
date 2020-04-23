const now = () => new Date();

const updateIcon = (url) => {
    let link = document.querySelector("link[rel*='icon']");
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}


const button = document.getElementById('startButton');
button.addEventListener('click', () => {
    const gs = document.getElementById('selectGoal');
    const goal = parseInt(gs.options[gs.selectedIndex].value);

    if (goal) {
        const container = document.getElementById('centerContainer');
        container.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'Taking of 🚀️';
        container.appendChild(h1);
        const start = now();

        updateIcon('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/241/rocket_1f680.png');
        const update = () => {
            let elapsed = parseInt((now() - start) / 1000);
            const minutes = parseInt(elapsed / 60);
            const remaining = goal - minutes;
            console.log('remaining', remaining);
            h1.innerHTML =  remaining;
            document.title = `${remaining}'`;
            if (!remaining > 0) {
                h1.innerHTML =  '👏🏻 Congrats 👏🏻';
                document.title = 'Congrats!';

                updateIcon('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/241/full-moon_1f315.png');
                clearInterval(t);
            }
        }

        let t = setInterval(update, 5000);
    }
    else {
        console.log('please select a duration');
    }

});


