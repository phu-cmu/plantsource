<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin.plantsource@gmail.com'],
            [
                'name'     => 'Admin Plantsource',
                'password' => 'Password123@',
                'role'     => 1,
            ]
        );
    }
}
