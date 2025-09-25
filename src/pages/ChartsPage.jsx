import { useMemo } from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const ChartsPage = ({ data }) => {
    const ageGroups = { '18-30': 0, '31-45': 0, '46-60': 0, '60+': 0 }
    data.forEach((user) => {
        if (user.age <= 30) {
            ageGroups['18-30'] += 1
        } else if (user.age <= 45) {
            ageGroups['31-45'] += 1
        } else if (user.age <= 60) {
            ageGroups['46-60'] += 1
        } else {
            ageGroups['60+'] += 1
        }
    })

    const ageData = Object.entries(ageGroups).map(([group, count]) => ({ group, count }));

    // Users by gender => {male: 20, female: 30}
    const genderGroups = useMemo(() => {
        const usersByGender = data.reduce((acc, curr) => {
            acc[curr.gender] = (acc[curr.gender] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(usersByGender).map(([gender, count]) => ({ gender, count }));
    }, [data]);

    const RADIAN = Math.PI / 180;
    const COLORS = ['#0000ff', '#FF8DA1'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${((percent ?? 1) * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <ResponsiveContainer style={{ 'marginTop': '30px' }} width="100%" height={300}>
                <BarChart width={730} height={250} data={ageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />

                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={genderGroups}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        dataKey="count"
                        nameKey="gender"
                    >
                        {genderGroups.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={730} height={250} data={genderGroups}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="count" fill="#8884d8" />
                    <XAxis dataKey="gender" />
                    <YAxis />
                    <Tooltip/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default ChartsPage;