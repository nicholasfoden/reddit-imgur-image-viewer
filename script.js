// ==UserScript==
// @name         Imgur Image Viewer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  View imgur images instead of links
// @author       desol
// @match        <$URL$>
// @grant        GM_xmlhttpRequest
// @include      *reddit*
// @exclude      *imgur*
// @connect      i.imgur.com
// ==/UserScript==

// use this to generate unique classnames for links
let tally = 0;

(function() {
    'use strict';
    console.log("running imgur viewer");
    document.addEventListener("mouseover", magic);
})();

/**
 * Match anything we mouse over to check for imgur links
 */
 function magic(input){
     // Match imgur urls e.g. i.imgur.com/anywordornumber.jpg (not gifv though yet!)
     let re = new RegExp(/^(http(s)?\:\/\/)?(i\.imgur\.com\/\w+)\.(jpg|png|gif)[^v]?/gi);
     // Check for imgur link
     if(input.target.href && re.test(input.target.href)){
         // Save the hovered element
         let e = input.target;
         //set a 'unique' id for the link
         e.id = 'imgur' + tally;
         //increment the tally
         tally++;
         //add after styles to the link showing the image
         document.styleSheets[0].insertRule(
             //
             `#${e.id}:after {
                  content: " ";
                  background: url(${e.href}) no-repeat;
                  background-size: auto 100%;
                  position: unset;
                  overflow: visible;
                  height: 300px;
                  display: none;
                  z-index: 1000;
              }`
         );
         //make it show on hover
         document.styleSheets[0].insertRule(
             `#${e.id}:hover:after {
                  display: block;
              }`
         );
         //set the height of the element to show the image
         e.height = '300px';
     }
 }

