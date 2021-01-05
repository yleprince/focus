const now = () => new Date();

const updateIcon = (url) => {
    let link = document.querySelector("link[rel*='icon']");
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}

function notify(text) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(text, {
            body: "You deserve a break ❤️",
            icon: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/273/sparkles_2728.png",
            silent: false
        });
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Notifications allowed!");
            }
        });
    }
}

function playSound(sound) {
    let sound_url;
    if (sound === "applause") {
        sound_url = "https://raw.githubusercontent.com/yleprince/focus/master/applauses.mp3"
    } else if (sound == "start") {
        sound_url = "https://raw.githubusercontent.com/yleprince/focus/master/start.mp3"
    }
    const audio = new Audio(sound_url);
    audio.play();
}


const gs = document.getElementById('selectGoal');
const url = new URL(window.location.href)
let goalFromUrl = url.searchParams.get("goal")
if (goalFromUrl) {
    let customOption = document.createElement("option");
    customOption.value = goalFromUrl;
    customOption.text = `${goalFromUrl} minutes`;
    gs.add(customOption, null)
}

const durations = [15, 25, 35]
durations.map(duration => {
    let option = document.createElement("option");
    option.value = duration;
    option.text = `${duration} minutes`;
    gs.add(option, null)
})

const button = document.getElementById('startButton');
button.addEventListener('click', () => {
    const goal = parseInt(goalFromUrl || gs.options[gs.selectedIndex].value);

    if (goal) {
        const container = document.getElementById('centerContainer');
        container.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'Taking of 🚀️';
        container.appendChild(h1);
        const start = now();

        playSound("start")
        updateIcon('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/241/rocket_1f680.png');
        const update = () => {
            let elapsed = parseInt((now() - start) / 1000);
            const minutes = parseInt(elapsed / 60);
            const remaining = goal - minutes;
            console.log('remaining', remaining);
            h1.innerHTML = remaining;
            document.title = `${remaining}'`;
            if (!remaining > 0) {
                h1.innerHTML = '👏🏻 Congrats 👏🏻';
                document.title = 'Congrats!';

                updateIcon('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/241/full-moon_1f315.png');
                clearInterval(t);
                notify(`Congrats! ${goal} minutes elapsed 🙏️`)
                playSound("applause")
            }
        }
        let t = setInterval(update, 5000);
    }
    else {
        console.log('please select a duration');
    }
});
