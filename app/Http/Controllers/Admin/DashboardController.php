<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Project;
use App\Models\Stat;
use App\Models\TeamContact;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects'      => Project::active()->count(),
                'stats'         => Stat::count(),
                'teamContacts'  => TeamContact::active()->count(),
                'newContacts'   => Contact::where('status', 'new')->count(),
                'totalContacts' => Contact::count(),
            ],

            'chartData' => Contact::selectRaw('DATE(created_at) as date, COUNT(*) as total')
                ->where('created_at', '>=', now()->subDays(30))
                ->groupBy('date')
                ->orderBy('date')
                ->get(),

            'recentContacts' => Contact::orderByDesc('created_at')
                ->take(5)
                ->select('id', 'name', 'email', 'service', 'status', 'created_at')
                ->get(),
        ]);
    }
}
