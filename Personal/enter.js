// const rowLength = 20;
// const colLength = 20;

// const blankRow = ".".repeat(rowLength * colLength);
// let blankChars = blankRow.split("");

// const text =
//     "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me.";

// const text2 = "serpere deinceps, noli haesitare, ut scolopendra";

// function replaceText(text) {
//     const resumeCenter = document.getElementById("resume-center");
//     resumeCenter.innerHTML = "";

//     const textChars = text.split("");
//     const textWords = text.split(" ");
//     const textLengthNoSpace = textWords.join("").length;

//     // console.log(`Blank row length: ${blankRow.length}`);
//     // console.log(`Text length: ${text.length}`);
//     // console.log(`Text length no space: ${textLengthNoSpace}`);

//     const blankSpace = blankRow.length - textLengthNoSpace;
//     const spaceBetween = Math.floor(blankSpace / (textWords.length - 1));

//     // console.log(`Total space: ${blankSpace}`);
//     // console.log(`Words: ${text.split(" ").length}`);
//     // console.log(`Space between words: ${spaceBetween}`);

//     // index for textChars
//     let j = 0;
//     let spaceCount = 0;
//     let wordComplete = false;
//     for (let i = 0; i < blankRow.length; i++) {
//         if (wordComplete == false) {
//             // console.log("[>] Word not completed");
//             if (j >= textChars.length || textChars[j] == " ") {
//                 // console.log("\tSpace found; word done");

//                 blankChars[i] = ".";
//                 wordComplete = true;
//                 spaceCount += 1;
//             } else {
//                 // console.log("\tNo space found");
//                 // console.log(`\tReplacing with ${textChars[j]}`);

//                 blankChars[i] = textChars[j];
//                 j += 1;
//             }
//         } else {
//             // console.log("[>] Word completed");

//             blankChars[i] = ".";
//             // console.log(`Difference in index: ${i - j + 1}`);
//             if (spaceCount + 1 >= spaceBetween) {
//                 // console.log("\tSpace completely filled");
//                 spaceCount = 0;
//                 wordComplete = false;
//                 j += 1;
//             } else {
//                 spaceCount += 1;
//                 // console.log("\tMore space to fill");
//             }
//         }
//     }

//     let finalArr = [];

//     let start = 0;
//     for (let i = 0; i < blankChars.length + 1; i++) {
//         if (i - start >= colLength) {
//             finalArr.push(blankChars.slice(start, i));
//             start = i;
//         }
//     }

//     // const resumeCenter = document.getElementById("resume-center");
//     finalArr.forEach((item, index) => {
//         const resumeRow = document.createElement("div");
//         resumeRow.className = "resume-row";

//         const p = document.createElement("p");
//         p.textContent = item.join("");

//         resumeRow.append(p);
//         resumeCenter.append(resumeRow);
//     });
// }

// function iterateToPeriods(text) {
//     let textTmp = text;
//     let currentIndex = 0; // Initialize the current index

//     function replaceCharacter() {
//         if (document.getElementById("resume-content").style.display != "none") {
//             console.log("Not none, continue code");
//             // Check if all periods are present
//             if (!allPeriods(textTmp)) {
//                 const randomIndex = Math.floor(Math.random() * textTmp.length);
//                 textTmp =
//                     textTmp.substring(0, randomIndex) +
//                     "." +
//                     textTmp.substring(randomIndex + 1);

//                 // Update the currentIndex and call the function again
//                 currentIndex = randomIndex;
//                 replaceText(textTmp);

//                 // Set a 2-second timeout before the next character replacement
//                 setTimeout(replaceCharacter, 100);
//             }
//         }
//     }
//     replaceCharacter();
// }

// function allPeriods(text) {
//     for (let i = 0; i < text.length; i++) {
//         if (text.charAt(i) != ".") {
//             return false;
//         }
//     }
//     return true;
// }

// function containsPeriod(text) {
//     for (let i = 0; i < text.length; i++) {
//         if (text.charAt(i) == ".") {
//             return true;
//         }
//     }
//     return false;
// }

// // iterateToPeriods(text);

// function iterateToString(text) {
//     let periodString = ".".repeat(text.length);

//     function replaceCharacter() {
//         if (document.getElementById("resume-content").style.display != "none") {
//             console.log("Not none, continue code");
//             if (containsPeriod(periodString)) {
//                 // Create a string of periods of the same length as text2

//                 const indexRandom = Math.floor(Math.random() * text.length);
//                 const randomChar = text[indexRandom];

//                 periodString =
//                     periodString.substring(0, indexRandom) +
//                     randomChar +
//                     periodString.substring(indexRandom + 1);

//                 replaceText(periodString);
//                 setTimeout(replaceCharacter, 100);
//             }
//         }
//     }
//     replaceCharacter();
// }

// iterateToString(text);

// // const resumeRows = document.querySelectorAll(".resume-row");

// // const newText = "test".split("");

// // // chance that row will be the text
// // const targetProbY = resumeRows.length / 100;
// // console.log(targetProbY);
// // let targetRowIndex = 0;

// // for (let i = 0; i < resumeRows.length; i++) {
// //     const targetChance = Math.random();
// //     console.log(targetChance);
// //     if (targetProbY > targetChance) {
// //         console.log(`Target row Y = ${i}`);
// //         targetRowIndex = i;
// //         break;
// //     }
// // }

// // // Select the <p> element within the specific .resume-row
// // const targetPElement = resumeRows[targetRowIndex].querySelector("p");

// // // chance that row will be the text
// // const targetProbX =
// //     resumeRows[0].querySelector("p").textContent.split("").length / 100;
// // let targetColIndex = 0;
// // console.log(targetProbX);

// // for (let i = 0; i < resumeRows.length - newText.length; i++) {
// //     const targetChance = Math.random();
// //     console.log(targetChance);
// //     if (targetProbX > targetChance) {
// //         console.log(`Target row X = ${i}`);
// //         targetColIndex = i;
// //         break;
// //     }
// // }

// // console.log(`x = ${targetColIndex}, y = ${targetRowIndex}`);

// // const originalString = targetPElement.textContent;

// // let newString = originalString.split("");

// // for (let i = 0; i < originalString.length; i++) {
// //     if (i < newText.length && newText[i] != " ") {
// //         newString[targetColIndex + i] = newText[i];
// //     } else if (newText[i] == " ") {
// //         newString[targetColIndex + i] = ".";
// //     }
// // }

// // targetPElement.textContent = newString.join("");
