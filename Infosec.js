// Function to remove duplicate characters from a string
function removeDuplicates(str) {
    return str
      .split('')
      .filter(function (item, pos, self) {
        return self.indexOf(item) === pos;
      })
      .join('');
  }
  
  // Function to generate the Playfair cipher key square
  function generateKeySquare(key) {
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    key = removeDuplicates(key);
  
    var alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    var keySquare = key + alphabet;
  
    return keySquare;
  }
  
  // Function to encrypt plaintext using Playfair cipher
  function playfairEncrypt(plaintext, key) {
    var keySquare = generateKeySquare(key);
    var ciphertext = '';
    plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  
    for (var i = 0; i < plaintext.length; i += 2) {
      var pair1 = plaintext[i];
      var pair2 = i + 1 < plaintext.length ? plaintext[i + 1] : 'X';
  
      var row1, col1, row2, col2;
      for (var j = 0; j < keySquare.length; j++) {
        if (keySquare[j] === pair1) {
          row1 = Math.floor(j / 5);
          col1 = j % 5;
        }
        if (keySquare[j] === pair2) {
          row2 = Math.floor(j / 5);
          col2 = j % 5;
        }
      }
  
      if (row1 === row2) {
        col1 = (col1 + 1) % 5;
        col2 = (col2 + 1) % 5;
      } else if (col1 === col2) {
        row1 = (row1 + 1) % 5;
        row2 = (row2 + 1) % 5;
      } else {
        var temp = col1;
        col1 = col2;
        col2 = temp;
      }
  
      ciphertext +=
        keySquare[row1 * 5 + col1] + keySquare[row2 * 5 + col2];
    }
  
    return ciphertext;
  }
  
  // Function to handle the encrypt button
  