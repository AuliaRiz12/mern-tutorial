const asyncHandler = require(`express-async-handler`)
//@desc    Get goals
//@route   GET /api/goals
//@access  Private
const getGoals = asyncHandler (async(req,res) => {
    res.status(200).json({messege: 'Get Goals'})
})
//@desc    Set goals
//@route   POST /api/goals
//@access  Private
const setGoals =asyncHandler(async(req,res) => {
if (!req.body.text){
    res.status (400)
    throw new Error ('Please add a text field')
}
res.status(200).json({messege: 'Set Goal'})
})
// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private 
const updateGoal = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Update Goal ${req.params.id}`})
})
// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private 
const deleteGoal = (req,res) => {
    res.status(200).json({message: `Delete Goal ${req.params.id}`})
}
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
