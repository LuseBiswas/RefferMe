// controllers/userController.js
export const getUserProfile = (req, res) => {
    // Access user information from `req.user` set by the auth middleware
    const user = req.user;
  
    // Return user profile information
    res.status(200).json({
      message: 'User profile data',
      data: {
        name: user.name,
        email: user.email,
        userType: user.userType
      }
    });
  };
  