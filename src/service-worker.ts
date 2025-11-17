chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translation",
    title: "translation!!!",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab) {
    return;
  }

  if (info.menuItemId === "translation") {
    chrome.tabs.sendMessage(tab.id!, {
      action: "detect",
      text: info.selectionText,
    });
    // .catch((reason) => {
    //   console.log(reason);
    // });
  }
});
