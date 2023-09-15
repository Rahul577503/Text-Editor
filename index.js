const contentElement = document.getElementById('content');
const tabsElement = document.getElementById('tabs');
const newTabButton = document.querySelector('.new-tab-button');
const saveButton = document.querySelector('.save-button');
const boldButton = document.querySelector('.bold-button');
const italicButton = document.querySelector('.italic-button');
const underlineButton = document.querySelector('.underline-button');
const highlightColorInput = document.querySelector('.highlight-color');
const textColorPicker = document.querySelector('.text-color-picker');
const fontSelector = document.querySelector('.font-style-selector');
let currentTab = 1;

// Button click event listeners

boldButton.addEventListener('click', () => {
    document.execCommand('bold', false, null);
});

italicButton.addEventListener('click', () => {
    document.execCommand('italic', false, null);
});

underlineButton.addEventListener('click', () => {
    document.execCommand('underline', false, null);
});

highlightColorInput.addEventListener('input', () => {
    const highlightColor = highlightColorInput.value;
    document.execCommand('hiliteColor', false, highlightColor);
});

textColorPicker.addEventListener('input', () => {
    const textColor = textColorPicker.value;
    document.execCommand('foreColor', false, textColor);
});

fontSelector.addEventListener('change', () => {
    const selectedFont = fontSelector.value;
    document.execCommand('fontName', false, selectedFont);
});

// Function to switch between tabs 
newTabButton.addEventListener('click', () => {
    currentTab++;
    const tabId = `tab-${currentTab}`;
    const tabTitle = `Tab ${currentTab}`;
    const tabElement = document.createElement('div');
    tabElement.className = 'tab';
    tabElement.dataset.id = tabId;
    tabElement.textContent = tabTitle;

    // Add a close button to the tab
    const closeIcon = document.createElement('i');
    closeIcon.className = 'material-icons close-tab';
    closeIcon.textContent = 'close';
    tabElement.appendChild(closeIcon);

    tabsElement.appendChild(tabElement);
    tabElement.addEventListener('click', () => switchTab(tabId));
    switchTab(tabId);
});


// Function to close a tab
function closeTab(tabId) {
    const tabToRemove = document.querySelector(`[data-id="${tabId}"]`);
    if (tabToRemove) {
        tabToRemove.remove();
        const activeTab = document.querySelector('.tab.active');
        const newTabId = activeTab ? activeTab.dataset.id : null;
        switchTab(newTabId);
    }
}

tabsElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('close-tab')) {
        const tabId = event.target.parentElement.dataset.id;
        closeTab(tabId);
    }
});
// Save content to the current tab
saveButton.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const tabId = activeTab.dataset.id;
        const content = contentElement.innerText;
        const tabContent = document.createElement('div');
        tabContent.dataset.content = content;
        document.getElementById(tabId)?.replaceWith(tabContent);
    }
});