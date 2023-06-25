
import fs from "fs";

function processFile(filename) {
    console.log(`Processing file: ${filename}`);
  
    return new Promise((resolve, reject) => {
      fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading file: ${filename}`);
          console.error(err);
          reject(err);
        } else {
          // Simulate additional processing
          setTimeout(() => {
            console.log(`File processing complete: ${filename}`);
            resolve(data);
          }, 2000);
        }
      });
    });
  }
 async function eventLoop() {
  try {
    const files = ["./files/file1.txt", "./files/file2.txt"];

    const filePromises = files.map((file) => processFile(file));
    const fileContents = await Promise.all(filePromises);

    console.log("All files processed:", fileContents);
    
  } catch (error) {
    console.log(error);
    
  }
}


eventLoop()