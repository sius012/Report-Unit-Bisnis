class LittleComponent {
    static status(status,){
        return `<div class="dropdown">
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${status}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Belum dikerjakan</a>
          <a class="dropdown-item" href="#">On Progress</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>`;
    }
}