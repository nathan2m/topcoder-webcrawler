// https://www.youtube.com/watch?v=xianIw6PleE

const port = 3000;
const address = "localhost";

const express = require('express');
const puppeteer = require('puppeteer');

const server = express();

server.get("/:handle", async (req, res) => {
    const { handle } = req.params;

    const handleHref = `https://www.topcoder.com/members/${handle}`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        await page.goto(handleHref, { waitUntil: "networkidle0"});
    
        const pageContent = await page.evaluate(() => {

            const onTheWebFull = document.querySelector("._2jHlDq");
            const onTheWeb = document.querySelectorAll("._2jHlDq a");
            if (onTheWebFull !== null && onTheWeb.length > 0) {
                let github = null;
                let stackoverflow = null;
                for (let i = 0; i < onTheWeb.length; i++) {
                    const content = onTheWeb[i];
                    const words = content.innerText.split("\n");
                    if (words[0] === "GITHUB" && words[3] === "FOLLOWERS" && words[5] === "REPOSITORIES") {
                        github = { username: words[1], href: content.getAttribute("href") };
                    }
                    if (words[0] === "STACK OVERFLOW" && words[3] === "REPUTATION" && words[5] === "ANSWERS") {
                        stackoverflow = { username: words[1], href: content.getAttribute("href") };
                    }
                }
                return { onTheWeb: onTheWebFull.innerText, github, stackoverflow };
            }
            return { onTheWeb: null, github: null, stackoverflow: null };
        });
        await browser.close();
        
        const { onTheWeb, github, stackoverflow } = pageContent;
    
        const topcoder = { handle: handle, href: handleHref };

        console.log("topcoder_handle: " + handle 
        + " | On_The_Web: " + onTheWeb
        + " | github_username: " + (github !== null ? github.username : null) 
        + " | stackoverflow_username: " + (stackoverflow !== null ? stackoverflow.username : null));
        res.send({ "topcoder": topcoder, "On_The_Web": onTheWeb, "github": github, "stackoverflow": stackoverflow });

    } catch (error) {
        console.log("Erro: " + error)
        res.send({ "Error_message": String(error) });
    }
});

server.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ 
        "Link template": `http://${address}:${port}/:handle` 
    });
});

server.listen(port, () => {
    console.log(`Endereço do servidor: http://${address}:${port}`);
});

/* await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
}); */
    //await page.screenshot({ path: 'example.png', fullPage: true });