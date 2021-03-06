export const UNIT_DEFS = {
  '~'                     : 'enemyUnits',
  sTeamleader             : 'Team Leader',
  sRifleman               : 'Rifleman',
  sATMan                  : 'AT Soldier',
  sAAMan                  : 'AA Soldier',
  sAmmobearer             : 'Ammo Bearer',
  sGrenadier              : 'Grenadier',
  sMedic                  : 'Medic',
  sMachineGunMan          : 'Machine Gunner',
  sSniper                 : 'Sniper',
  sExpSpec                : 'Explosive Specialist',
  sEnemyHeliPilot         : 'Pilot',
  sTank1ArmedCar          : 'Armed Car',
  sTank2APC               : 'APC',
  sTank3Tank              : 'Tank',
  sArtilleryVeh           : 'Artillery',
  sAAAVeh                 : 'AAA',
  sMortar                 : 'Mortars',
  sBoatUnit               : 'Boat',
  ReinforceVehicle        : 'Reinforcements Helicopter',
  EnemyAirToAirSupports   : 'Air to Air Support Vehicles',
  EnemyAirToGroundSupports: 'Air to Ground Support Vehicles',
  EnemyAirScout           : 'Air Scout Vehicles',
  UnarmedScoutVehicles    : 'Unarmed Scout Vehicles',
  EnemyBaseChoppers       : 'Attack Helicopters',
  '~~'                    : 'militiaUnits',
  sTeamleaderMilitia      : 'Militia Team Leader',
  sRiflemanMilitia        : 'Militia Rifleman',
  sATManMilitia           : 'Militia AT Solider',
  sAAManMilitia           : 'Militia AA Soldier',
  sAmmobearerMilitia      : 'Militia Ammo Bearer',
  sGrenadierMilitia       : 'Militia Grenadier',
  sMedicMilitia           : 'Militia Medic',
  sMachineGunManMilitia   : 'Militia Machine Gunner',
  sTank1ArmedCarMilitia   : 'Militia Armed Car',
  sTank2APCMilitia        : 'Militia APC',
  sTank3TankMilitia       : 'Militia Tank',
  sAAAVehMilitia          : 'Militia AAA',
  sMortarMilitia          : 'Militia Mortar',
  '~~~'                   : 'missionObjectiveUnits',
  InformantClasses        : 'Informant HVTs',
  InterogateOfficerClasses: 'Officer HVTs',
  WeaponDealerClasses     : 'Arms Dealer HVTs',
  sideResarchTruck        : 'Research Vehicles',
  SideRadioClassNames     : 'Hacking Objects',
  sideAmmoTruck           : 'Ammo Truck Targets',
  DestroyAAAVeh           : 'AAA Vehicle Targets',
  BombToDefuse            : 'Bomb Defusal Objects',
  '~~~~'                  : 'civilianUnits',
  sRiflemanFriendInsurg   : 'Friendly Insurgent',
  sCivilian               : 'Civilians',
  CivCars                 : 'Civilian Cars',
  HVTCars                 : 'HVT Cars',
  HVTVans                 : 'HVT Vans',
  HVTChoppers             : 'HVT Helicopters',
  HVTPlanes               : 'HVT Planes',
};

export const UNIT_DEFAULTS = {
  sTeamleader             : 'O_T_Soldier_TL_F',
  sRifleman               : 'O_T_Soldier_F',
  sATMan                  : 'O_T_Soldier_LAT_F',
  sAAMan                  : 'O_T_Soldier_AA_F',
  sAmmobearer             : 'O_T_Soldier_A_F',
  sGrenadier              : 'O_T_Soldier_GL_F',
  sMedic                  : 'O_T_Medic_F',
  sMachineGunMan          : 'O_T_Soldier_AR_F',
  sSniper                 : 'O_T_Sniper_F',
  sExpSpec                : 'O_T_Soldier_Exp_F',
  sEnemyHeliPilot         : 'O_helipilot_F',
  sTank1ArmedCar          : 'O_T_LSV_02_armed_F',
  sTank2APC               : 'O_T_APC_Wheeled_02_rcws_ghex_F',
  sTank3Tank              : 'O_T_MBT_02_cannon_ghex_F',
  sArtilleryVeh           : 'O_T_MBT_02_arty_ghex_F',
  sAAAVeh                 : 'O_T_APC_Tracked_02_AA_ghex_F',
  sMortar                 : ['O_Mortar_01_F'],
  sBoatUnit               : 'O_T_Boat_Armed_01_hmg_F',
  ReinforceVehicle        : 'O_T_VTOL_02_infantry_F',
  EnemyAirToAirSupports   : ['O_Plane_Fighter_02_F'],
  EnemyAirToGroundSupports: ['O_Heli_Attack_02_dynamicLoadout_F'],
  EnemyAirScout           : ['O_UAV_02_dynamicLoadout_F'],
  UnarmedScoutVehicles    : ['O_G_Van_02_vehicle_F'],
  EnemyBaseChoppers       : ['O_T_VTOL_02_infantry_F'],
  sTeamleaderMilitia      : 'O_G_Soldier_TL_F',
  sRiflemanMilitia        : 'O_G_Soldier_F',
  sATManMilitia           : 'O_G_Soldier_LAT_F',
  sAAManMilitia           : 'O_G_Soldier_LAT_F',
  sAmmobearerMilitia      : 'O_G_Soldier_A_F',
  sGrenadierMilitia       : 'O_G_Soldier_GL_F',
  sMedicMilitia           : 'O_G_medic_F',
  sMachineGunManMilitia   : 'O_G_Soldier_AR_F',
  sTank1ArmedCarMilitia   : 'O_G_Offroad_01_armed_F',
  sTank2APCMilitia        : 'O_G_Offroad_01_armed_F',
  sTank3TankMilitia       : 'O_G_Offroad_01_armed_F',
  sAAAVehMilitia          : '',
  sMortarMilitia          : ['O_G_Mortar_01_F'],
  InformantClasses        : ['C_Nikos'],
  InterogateOfficerClasses: ['O_T_Officer_F'],
  WeaponDealerClasses     : ['C_man_hunter_1_F'],
  sideResarchTruck        : ['O_Truck_03_device_F'],
  SideRadioClassNames     : ['Land_PortableGenerator_01_F'],
  sideAmmoTruck           : ['O_Truck_03_ammo_F'],
  DestroyAAAVeh           : ['O_T_APC_Tracked_02_AA_ghex_F'],
  BombToDefuse            : ['Land_SatellitePhone_F'],
  sRiflemanFriendInsurg   : 'B_G_Soldier_F',
  sCivilian               : ['C_man_polo_6_F'],
  CivCars                 : ['C_Truck_02_transport_F'],
  HVTCars                 : ['C_Hatchback_01_sport_F'],
  HVTVans                 : ['C_Van_01_box_F'],
  HVTChoppers             : ['C_Heli_Light_01_civil_F'],
  HVTPlanes               : ['C_Plane_Civil_01_F'],
};
