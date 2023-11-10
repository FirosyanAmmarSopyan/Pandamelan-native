const { Job, Company, Skill, sequelize } = require("../models/index");

class EntityController {
  static async renderAllJobs(req, res, next) {
    try {
      const jobs = await Job.findAll({
        include : [Skill , Company]
      });
      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
    }
  }
  static async renderAllCompanies(req, res, next) {
    try {
      const company = await Company.findAll();
      res.status(200).json(company);
    } catch (error) {
      console.log(error);
    }
  }

  static async handlerCompanies(req, res, next) {
    try {
      const { name, companyLogo, location, email, description } = req.body;
      const company = await Company.create({
        name,
        companyLogo,
        location,
        email,
        description,
      });
      res.status(201).json(company);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteCompanies(req, res, next) {
    try {
      const { id } = req.params;

      const company = await Company.destroy({ where: { id } });
      if (!company) {
        throw { name: "not found" };
      }
      res.status(200).json({
        message: `company success to delete`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async handlerJobs(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { title, description, companyId, authorId, jobType, skills } =
        req.body;
      const job = await Job.create(
        { title, description, companyId, authorId, jobType },
        { transaction: t }
      );

      const sekil = skills.map((el) => {
        el.jobId = job.id;
        return el;
      });

      const skill = await Skill.bulkCreate(sekil, { transaction: t });

      await t.commit();
    } catch (error) {
      await t.rollback();
      console.log(error);
    }
  }

  static async getDetail(req, res, next) {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id, {
        include: [Skill , Company],
      });
      if (!job) {
        throw { name: "not found" };
      }
      res.status(200).json(job);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async replaceEditJob(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, companyId, authorId, jobType, skills } =
        req.body;

      const findJob = await Job.findByPk(id);
      if (!findJob) {
        throw { name: "not found" };
      }
      const updateJob = await Job.update(
        {
          title,
          description,
          companyId,
          authorId,
          jobType,
          skills,
        },
        { where: { id } }
      );
      console.log(updateJob);

      res.status(200).json({ message: `Job with id ${id} updated` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteJob(req, res, next) {
    try {
      const { id } = req.params;

      const job = await Job.destroy({ where: { id } });
      if (!job) {
        throw { name: "not found" };
      }
    
      res.status(200).json({
        message: `job success to delete`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = EntityController;
