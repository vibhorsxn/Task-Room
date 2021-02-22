var today = new Date().toISOString().split("T")[0];
document.getElementById("deadline").setAttribute("min", today);

function changePassword(){
    document.getElementById("passwordField").style.display="block";
    document.getElementById("changeBtn").style.visibility="hidden";
}
