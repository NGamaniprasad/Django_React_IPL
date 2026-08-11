function TeamCard({ name }) {
    return (
        <div className="team-card">

            <div className="team-icon">
                🏏
            </div>

            <h3>{name}</h3>

            <p>
                IPL Team
            </p>

        </div>
    );
}

export default TeamCard;