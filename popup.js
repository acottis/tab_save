const get_tabs = document.querySelector('#get_tabs');
const test_label = document.querySelector('#output');

// Even Listening for the Get Tabs button
get_tabs.addEventListener("click", async (e) => {

    // Calls getUrls
    getUrls();
    // browser.tabs.executeScript({file: "/content.js"});
})

// Function that gets a list of tabs and loops through them.
const getUrls = async () => {

    // Stores the text to write to send to clipboard
    let clipboard_buffer = "";

    // Gets the list of tabs from the FirefoxAPI
    let tabs = await browser.tabs.query({ currentWindow: true });

    // Loops through the tabs and adds the url to the buffer
    tabs.forEach((tab) => {
        test_label.innerHTML = tab.url;
        clipboard_buffer = clipboard_buffer + tab.url + "\n"

    })

    // Pastes tabs to clipboard
    navigator.clipboard.writeText(clipboard_buffer)
    //navigator.clipboard.write(tabs);
}
