import UserInfo from "../models/userInfo.js";
export const addTableData = async (req, res) => {
     const { employeName, department, salary } = req.body;
     try {
          const data = await UserInfo.create({ employeName, department, salary });
          res.json(data);

     } catch (error) {
          res.status(400).send({ messege: 'no new record added' });
     }

}

export const getTableData = async (req, res) => {
     try {
          const data = await UserInfo.find({}).sort({createdAt: 1});
          res.json(data)
     } catch (error) {
          res.status(400).send('adding new todo failed');
     }
}

export const updateTableRecord = async (req, res) => {
     const { id } = req.params;
     const { employeName, department, salary } = req.body;
     try {
          const isExist = await UserInfo.findById(id);
          if (!isExist) return res.status(404).send('Data is not found');
          const data = await UserInfo.findByIdAndUpdate(id, { employeName: !employeName ? isExist.employeName : employeName, department: !department ? isExist.department : department, salary: !salary ? isExist.salary : salary });
          res.json(data)
     } catch (error) {
          res.status(400).send({ messege: 'not updated' });
     }

}

export const sortTableRecord= async (req, res) => {
     const { tablekey, id } = req.params;
  
     try {
          const data = await UserInfo.find({}).sort({ [tablekey]:  id });
          res.json(data)
     } catch (error) {
          res.status(400).send({ messege: 'something went wrong' });
     }
}

export const deleteTableRecord = async (req, res) => {
     const { id } = req.body;
     try {
          const data = await UserInfo.findOneAndRemove(id);
          res.json(data);
     } catch (error) {
          res.status(400).send({ messege: 'not deleted' });
     }
}