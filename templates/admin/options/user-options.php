          <md-menu md-position-mode="target-left target" >
            <a class="mdm nohide md-primary"  ng-click="$mdOpenMenu()">
         <i class="fas fa-cog"></i>
           </a>
            <md-menu-content class="admina" width="2">
            <md-menu-item>
                <md-button ng-click="launchUserEdit(item)">
                 <i class="fa fa-edit"></i> &nbsp; Edit Profile
                </md-button>
              </md-menu-item>
            <md-menu-divider></md-menu-divider>
                        <md-menu-item>
                <md-button  ng-click="launchUserDel(item.id)">
                 <i class="fa fa-trash"></i> &nbsp; Delete User
                </md-button>
              </md-menu-item>
            <md-menu-divider></md-menu-divider>
            <md-menu-item ng-if="item.status == 1">
                <md-button  ng-click="launchUserBlock(item.id,'-1')">
                 <i class="fa fa-ban"></i> &nbsp; Block User
                </md-button>
              </md-menu-item>

              <md-menu-item ng-if="item.status == -1">
                <md-button  ng-click="launchUserBlock(item.id,'1')">
                 <i class="fa fa-ban"></i> &nbsp; UnBlock User
                </md-button>
              </md-menu-item>
            <md-menu-divider></md-menu-divider>

                        <md-menu-item>
                <md-button ng-click="launchAcc('credit',item.id)">
                <i class="fa fa-plus"></i> &nbsp; Credit Account
                </md-button>
              </md-menu-item>
            <md-menu-divider></md-menu-divider>
              <md-menu-item>
                <md-button ng-click="launchAcc('debit',item.id)">
             <i class="fa fa-minus"></i> &nbsp; Debit Account
                </md-button>
              </md-menu-item>
              <md-menu-divider></md-menu-divider>
              
              <md-menu-item ng-if="item.type === 'user'">
                <md-button ng-click="launchAdm(item.id,'admin')">
             <i class="fa fa-user-plus"></i> &nbsp; Make Admin
                </md-button>
              </md-menu-item>
              <md-menu-item ng-if="item.type === 'admin'">
                <md-button ng-click="launchAdm(item.id,'user')">
             <i class="fa fa-user-plus"></i> &nbsp; Remove As Admin
                </md-button>
              </md-menu-item>
              <md-menu-divider></md-menu-divider>

              <md-menu-item>
                <md-button ng-click="launchUlog(item.id)">
             <i class="fa fa-sign-in"></i> &nbsp; Login As User
                </md-button>
              </md-menu-item>
              <md-menu-divider></md-menu-divider>

        <md-menu-content>
        </md-menu-bar>
        