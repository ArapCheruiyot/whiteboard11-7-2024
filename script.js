document.addEventListener("DOMContentLoaded", () => {
    const newFileButton = document.getElementById("new-file");
    const searchButton = document.getElementById("search");
    const deleteButton = document.getElementById("delete");
    const textInput = document.getElementById("text-input");
    const searchInput = document.getElementById("search-input");
    const fileNamesContainer = document.getElementById("file-names");

    // Yellow notepad elements
    const rememberButton = document.querySelector(".styled-but");
    const yellowNotepadContent = document.querySelector(".yellow-notepad textarea");
    const yellowNotepadDeleteButton = document.querySelector(".yellow-notepad button");

    // Object to store notes
    let notes = {};

    // Update yellow notepad title with the first line of the input text
    textInput.addEventListener("input", () => {
        const firstLine = textInput.value.split("\n")[0];
        yellowNotepadContent.placeholder = firstLine || "";
    });

    // Create a new note
    newFileButton.addEventListener("click", () => {
        const title = yellowNotepadContent.placeholder || "Untitled Note";
        if (textInput.value.trim()) {  // Ensure there is text before creating a note
            notes[title] = textInput.value;
            displayFileNames();
            textInput.value = "";  // Clear text area
            yellowNotepadContent.placeholder = ""; // Clear title
        } else {
            alert("Please enter text for the new note.");
        }
    });

    // Display file names in the sidebar
    function displayFileNames() {
        fileNamesContainer.innerHTML = "";  // Clear existing file names
        Object.keys(notes).forEach(title => {
            const fileNameElement = document.createElement("div");
            fileNameElement.className = "file-name";
            fileNameElement.textContent = title;
            fileNameElement.addEventListener("click", () => {
                textInput.value = notes[title];
                yellowNotepadContent.placeholder = title;
            });
            fileNamesContainer.appendChild(fileNameElement);
        });
    }

    // Search functionality for notes
    searchButton.addEventListener("click", () => {
        searchInput.style.display = "inline"; // Show search input
        searchInput.focus();
    });

    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.toLowerCase();
        document.querySelectorAll(".file-name").forEach(fileName => {
            fileName.style.backgroundColor = fileName.textContent.toLowerCase().includes(searchQuery)
                ? "yellow"
                : "transparent";
        });
    });

    // Clear search input when clicking outside of it
    document.addEventListener("click", (event) => {
        if (event.target !== searchButton && event.target !== searchInput) {
            searchInput.style.display = "none";  // Hide search input
            searchInput.value = "";  // Clear search input
            document.querySelectorAll(".file-name").forEach(fileName => {
                fileName.style.backgroundColor = "transparent";  // Reset file name colors
            });
        }
    });

    // Delete the selected note
    deleteButton.addEventListener("click", () => {
        const title = yellowNotepadContent.placeholder;
        if (title && notes[title]) {
            delete notes[title];
            displayFileNames();
            textInput.value = "";  // Clear text area
            yellowNotepadContent.placeholder = ""; // Clear title
            alert(`Deleted note titled: ${title}`);
        } else {
            alert("No note found to delete.");
        }
    });

    // "Remember" button to add the current note content to yellow notepad
    rememberButton.addEventListener("click", () => {
        const content = textInput.value;
        if (content.trim()) {  // Only add if there is content
            const timestamp = new Date().toLocaleString();
            yellowNotepadContent.value += `---\n${timestamp}\n${content}\n\n`;
            alert("Content added to yellow notepad.");
        } else {
            alert("No content to remember.");
        }
    });

    // Clear button to empty the yellow notepad content
    yellowNotepadDeleteButton.addEventListener("click", () => {
        yellowNotepadContent.value = ""; // Clear content
        alert("Yellow notepad cleared.");
    });

    // Iframe Management
    const iframeProrate = document.getElementById("iframe-prorate");
    const iframeOffers = document.getElementById("iframe-offers");
    const iframeClarity = document.getElementById("iframe-clarity");
    const iframeGenesys = document.getElementById("iframe-genesys");

    const buttonProrate = document.getElementById("button1");
    const buttonOffers = document.getElementById("button2");
    const buttonClarity = document.getElementById("button3");
    const buttonGenesys = document.getElementById("button4");

    // Function to show the iframe
    function showIframe(iframe) {
        // Hide other iframes
        [iframeProrate, iframeOffers, iframeClarity, iframeGenesys].forEach(frame => {
            frame.style.display = "none";
        });
        // Show the hovered iframe
        iframe.style.display = "block";
    }

    // Function to hide all iframes
    function hideIframes() {
        [iframeProrate, iframeOffers, iframeClarity, iframeGenesys].forEach(frame => {
            frame.style.display = "none";
        });
    }

    // Event listeners for hover actions
    buttonProrate.addEventListener("mouseenter", () => showIframe(iframeProrate));
    buttonOffers.addEventListener("mouseenter", () => showIframe(iframeOffers));
    buttonClarity.addEventListener("mouseenter", () => showIframe(iframeClarity));
    buttonGenesys.addEventListener("mouseenter", () => showIframe(iframeGenesys));

    // Hide iframes when mouse leaves iframe
    [iframeProrate, iframeOffers, iframeClarity, iframeGenesys].forEach(iframe => {
        iframe.addEventListener("mouseleave", hideIframes);
    });

    // Hide iframes when clicking outside
    document.addEventListener("click", (event) => {
        // Check if click was outside all iframes and buttons
        if (![buttonProrate, buttonOffers, buttonClarity, buttonGenesys].includes(event.target) &&
            ![iframeProrate, iframeOffers, iframeClarity, iframeGenesys].some(iframe => iframe.contains(event.target))) {
            hideIframes();
        }
    });
});
