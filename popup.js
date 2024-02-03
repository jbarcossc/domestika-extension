chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    // Use chrome.scripting.executeScript to inject a content script into the current tab
    chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: function() {
            const queryResult = main(document);
            if(queryResult){
                chrome.runtime.sendMessage({ result: queryResult });
            }
        }
    });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const text = document.getElementById('text');
    const duration = document.getElementById('duration');
    const result = message.result;
    if (result[0] === 0){
        text.textContent = "Playlist duration:";
        duration.textContent += result[1];
    } else {
        text.textContent = "This is not a YouTube watch or playlist website";
        duration.style.display = 'none';
    }
});