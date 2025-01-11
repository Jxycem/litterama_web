import express from "express";
import i18nMiddleware from './localization.js';
import cookieParser from "cookie-parser";
import session from "express-session";
import app from "../index.js";

const defineLang = async function (req, res, next) {
    if (!req.session.lng) {
        req.session.lng = req.language; // req.language est défini par i18next
      }
    
      // Changer la langue si un paramètre est passé
      const lng = req.query.lang;
      if (lng) {
        req.session.lng = lng;
        req.i18n.changeLanguage(lng);
      };
      app.locals.lang = req.language
      next();
};

export default defineLang