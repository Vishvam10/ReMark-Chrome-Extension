# Annotator-Chrome-Extension

This a simple chrome extension to annotate any website. It is built using pure `Vanilla JS`, `HTML5` and `CSS3`. It uses `Manifest v3`.

<br>

# Local Development

<br>

1. Clone this repository

```
  git clone https://github.com/Vishvam10/ReMark-Chrome-Extension
```

2. Go to the `chrome_extension` folder 

```
  cd chrome_extension
```

3. Open `Google Chrome` and type `chrome://extensions/` on the search bar. This will open the **extensions** page

4. Click on `Developer Mode` to enable it

5. Click on `Load Unpacked`. A file upload popup would appear. Choose the `chrome_extension` folder

6. Just for the sake of it, **update and reload** it a couple of times.Now, the extension would have loaded and you are good to go

7. Click on the extension icon. This will show a small registration page. Click on **register for an account using your email**

<br>

**NOTE :** If a **leaderboard** page is shown at the beginning instead of the registration page, and / or if it says "**Signed in as undefined**" or if there is **no Start Annotation** button, kindly click on the **Sign Out** and then sign in again

<br>

# Usage

<br>

To **select a labe**, simply `Left Click` on it. A **green border** will appear stating that it has been selected. A **red border** indicates that a label for that particular element has been created.

<br>

For **normal CRUD operations** of a label, hover on any element :

<br>

- To **create** an annotation : 
  - `Left Click` on it

<br>

- To **delete** an annotation : 
  - `Atl + Click` on it OR 
  - `Left Click` on it and choose `Remove Label` option from the dropdown

<br>

- To **edit** an annotation : 
  - `Click` on it and choose a label from the dropdown

<br>

For **batch operations** of a label :

<br>

- To **batch create** : 
  - Toggle the `Group Elements` button and do : 
    - `Left Click` on the element

<br>

- To **batch delete** : 
  - Toggle the `Group Elements` button and either :
    - `Alt + Left Click` to delete them OR
    - Choose `Remove Label` option from the dropdown

<br>

- To **batch edit** : 
  - Toggle the `Group Elements` button and : 
    - Choose a label from the dropdown



