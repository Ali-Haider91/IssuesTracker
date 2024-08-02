const express = require('express')
const router = express()
const Issue = require("../models/Issues.model.js")


router.post('/', async (req, res) => {

    try {
        const response = await Issue(req.body).save()
        console.log('data saved')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.meaasge })
    }
})
router.get('/alldata', async (req, res) => {
    try {
        const GetIssue = await Issue.find()
        console.log('Data fetch')
        res.status(200).json(GetIssue)
    } catch (error) {
        console.log(500).json({ message: error.message })
    }
})
// update speccific record
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const updates = req.body

    try {
        const issue = await Issue.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!issue) {
            return res.status(404).send()
        } console.log('data will update')
        res.send(issue);
    } catch (error) {
        res.status(400).send(error)
    }
});

// Delete a specific issue
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const issue = await Issue.findByIdAndDelete(id)
        if (!issue) {
            return res.status(404).send()
        }
        res.send(issue)
        console.log('delete reccord')
    } catch (error) {
        res.status(500).send(error)
    }
});

// Delete all issues
router.delete('/', async (req, res) => {
    try {
        await Issue.deleteMany({})
        res.status(204).send()
        console.log('All delete')
    } catch (error) {
        res.status(500).send(error)
    }
});

// fetch speccific issue
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const issue = await Issue.findById(id)
        if (!issue) {
            return res.status(404).send()
        }
        res.send(issue)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Fetch all issues with filters
router.get('/', async (req, res) => {
    try {
        const { priority, date, status } = req.query
        const filters = {};

        if (priority) {
            filters.priority = {$regex:priority ,$options:"i",}
        }
        if (date) {
            filters.date = {$regex:date ,$options:"i",}
        }
        if (status) {
            filters.status = {$regex:status ,$options:"i",}
        }
        console.log(filters)

        const issues = await Issue.find(filters)
        res.send(issues)
        res.status(200).json(issues)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router