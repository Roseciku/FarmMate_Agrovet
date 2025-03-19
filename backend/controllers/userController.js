const db = require ('../config/db');
const jwt = require("jsonwebtokens");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
require("dotenv").config();

//register a user
exports.registerUser = async(req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({message:"Please correct input errors", errors: errors.array()});
    }
    const{name, email, password} = req.body

    try {
       const [users] = await db.execute("SELECT email FROM users WHERE email = ?",[email] );
       
       if(users.length > 0){
        return res.status(400).json({message: "User already exists"})
       }

       const hashedPassword = await bcrypt.hash(password, 10)

       await db.execute(
        "INSERT INTO users(name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]
       );
       return res.status(201).json({message:"User registed Successfully!"});
    } catch (error) {
        console.error(error);

        res.status(500).json({message: "An error occured during registration", error: error.message,})
    }
};

//Login
exports.loginUser = async (req, res) => {
    const {email, password } = req.body

    try {
        //check if user exist
    const [user] = await db.execute("SELECT user_id, name, email, password FROM users WHERE email = ?", [email]);
    
    console.log ({user});

    if (user.length === 0){
        return res.status(400).json({ message: "The user does not exist"})
    }
     const isMatch = await bcrypt.compare(password, user[0].password);

     if(!isMatch){
        return res.status(400).json({message: "Invalid email/password"})
     }

//create JWTs
//access token
const accessToken = jwt.sign(
    {userId: user[0].user_id, email: user[0].email},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "15m"}
);
console.log("Access token is:", accessToken)

//refresh token
const refreshToken = jwt.sign(
    {userId: user[0].user_id, email: user[0].email},
    process.env.REFRESH_TOKEN_SECRET,
    {expires: "1d"}
);

//Saving refresh token in the database
const [saveTokens] = await db.execute(
    "INSERT INTO refresh_tokens(user_id, refreshToken)VALUES(?, ?)",
    [user[0].user_id, refreshToken]
);
console.log("Refresh token saved:", saveTokens);

res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
});
return res.status(200).json({accessToken});

} catch (error) {
        console.error(error);
        res.status(500).json({message: "An error occured during login", error: error.message});
    }
};

//refresh endpoint that receoves the refreshtoken form cookie, verifies it and issues a new access token
//Frontend should call this endpoint when the access token expires

exports.refreshToken = async (req, res) => {
const refreshToken = req.cookies?.jwt; //req.cookies contains all the cookies sent by the clinet and cookies?.jwt checks if there is a jwt cookie.
if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token found" });
}


try {
    // Check if refresh token exists in the database
    const [tokenResult] = await db.execute(
        "SELECT * FROM refresh_tokens WHERE refreshToken = ?",
        [refreshToken]
      );
  
      if (tokenResult.length === 0) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
  
      // Verify refresh token
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
  
        // Generate a new access token
        const accessToken = jwt.sign(
          { userId: decoded.userId, email: decoded.email},
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
  
        res.json({ accessToken });
      });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error refreshing token" });
}

}
