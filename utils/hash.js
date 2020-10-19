/*@author: Moeid Heidari
Description: used to hash a string with an specific salt.
*/
const bcrypt = require('bcrypt');
//======================================================================================================================

/*@author: Moeid Heidari
parameters: input (String)
Description: used to hash a string as input with an specific salt.
*/
async function hash(input) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(input, salt);
    return hashed;
}

//======================================================================================================================
/*@author: Moeid Heidari
Description: export hash method to be used outside the file.
*/
exports.hash = hash;