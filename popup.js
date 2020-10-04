const copy_tabs = document.querySelector('#copy_tabs');
const paste_tabs = document.querySelector('#paste_tabs');
const output = document.querySelector('#output');

// Even Listening for the copy tabs button
copy_tabs.addEventListener("click", async (e) => {
    // Calls getUrls
    copyUrls();
    // browser.tabs.executeScript({file: "/content.js"});
})

// Even Listening for the Get Tabs button
paste_tabs.addEventListener("click", async (e) => {
    // Calls getUrls
    pasteUrls();
    // browser.tabs.executeScript({file: "/content.js"});
})

// Function that gets a list of tabs and loops through them.
const copyUrls = async () => {

    // Stores the text to write to send to clipboard
    let clipboard_buffer = "";

    // Gets the list of tabs from the FirefoxAPI
    const tabs = await browser.tabs.query({ currentWindow: true });

    // Loops through the tabs and adds the url to the buffer
    tabs.forEach((tab) => {
        output.innerHTML = tab.url;
        clipboard_buffer = clipboard_buffer + tab.url + "\n";
    })
    clipboard_buffer = clipboard_buffer.slice(0, -1);

    // Pastes tabs to clipboard
    navigator.clipboard.writeText(clipboard_buffer);
    //navigator.clipboard.write(tabs);
}


// Function that gets a list of tabs and loops through them.
const pasteUrls = async () => {

    // Reads from clipboard and splits by newline
    const url_list = await navigator.clipboard.readText();
    const url = url_list.split("\n");

    // Opens new tab in loop
    url.forEach(async (url) => {
        try {
            browser.tabs.create({ url: url });
        }
        catch(Error) {
            output.innerHTML = Error;
        }
    })

}