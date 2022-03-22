import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Input, Link, Table, Popover, Tag } from "element-react";
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
} from "react-router-dom";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/en";

import "element-theme-default";
import Ajout_seance from "./Ajout_seance";

i18n.use(locale);

export class Accueil extends Component {
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h2>Plateforme d'innovation de l'Ecole Centrale de Lyon</h2>
                <h1>Innov@Ecl</h1>
                <h3>
                    Pour commencer une nouvelle séance cliquer sur le bouton
                </h3>

                <Popover
                    placement='right'
                    title='Ajouter une seance'
                    width='400'
                    trigger='click'
                    content={<Ajout_seance />}
                >
                    Commencer une nouvelle séance
                </Popover>
            </div>
        );
    }
}

export default Accueil;
