import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from "react-redux";

const Header = () => {

    const {author} = useSelector(state => state.author);

    return (
        <header>
            <div className="container flex space-between align-center">
                <figure className="flex align-center space-center">
                    <FontAwesomeIcon color="#FFFFFF" icon={faHtml5} />
                </figure>
                <h2>
                    Zadanie <strong>rekrutacyjne</strong>
                    {author && (
                        <span>
                            {author}
                        </span>
                    )}
                </h2>
            </div>
        </header>
    )
}

export default Header;