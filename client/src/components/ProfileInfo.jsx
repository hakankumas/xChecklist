function ProfileInfo({ data }) {
    const { domain_name, google_account, email, step_no } = data;
    const stepTexts = {
        0: "Analizi Başlat",
        1: "Ön Analiz",
        2: "Detaylı Analiz",
        3: "Analiz Tamamlandı",
    };
    return (
        <div className="shadow p-4 rounded-3">
            <div className="card-body">
                <div className="card-title text-center fs-3 mb-3">
                    Profil Bilgileri
                </div>
                <p className="card-text mb-2">
                    <span>Domain Adı: </span>
                    <br />
                    <strong>{domain_name}</strong>
                </p>
                <p className="card-text mb-2">
                    <span>Google Hesabı: </span>
                    <br />
                    <strong>{google_account}</strong>
                </p>
                <p className="card-text mb-2">
                    <span>Email: </span>
                    <br />
                    <strong>{email}</strong>
                </p>
            </div>
            <hr className="m-0 mb-3" />
            <div className="text-danger text-center fnt-italic fw-bold fs-5">
                {stepTexts[step_no] || "Bilinmeyen Adım"}
            </div>
        </div>
    );
}

export default ProfileInfo;
